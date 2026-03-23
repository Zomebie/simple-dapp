# Adena Wallet Integration

Gno.land 블록체인과 Adena 지갑을 연동하여 기본적인 지갑 기능(연결, 주소 조회, 잔액 조회, GNOT 전송)을 구현한 React SPA입니다.

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트 & 포맷팅
npm run lint
npm run format
```

### 사전 준비

1. [Adena Wallet](https://www.adena.app/) Chrome 확장 프로그램 설치
2. 지갑 생성 후 **Staging** 네트워크로 전환 (Settings > Change Network)
3. Faucet으로 테스트 GNOT 토큰 수령

## Architecture

3-Layer 구조로 관심사를 분리했습니다.

```
View Layer (components)  →  Business Layer (services)  →  Data Layer (api)
  UI 렌더링 & 이벤트 핸들링        비즈니스 로직 & 데이터 가공         지갑 API 호출
        ↑
  Context (contexts)
    의존성 주입
```

- **View Layer**: `useWallet()` 훅을 통해 Context에서 서비스 함수를 주입받아 사용
- **Business Layer**: 응답 검증, 에러 처리, 데이터 변환 등 비즈니스 로직 담당
- **Data Layer**: `WalletProvider` 인터페이스를 통해 지갑 API를 추상화하여 호출
- **Providers**: `WalletProvider` 인터페이스의 구체적 구현체 (e.g. `AdenaProvider`)
- **Context**: 서비스 함수와 상태를 컴포넌트에 주입 (의존성 주입 패턴)

### 테스트 용이성을 위한 설계

컴포넌트가 서비스 모듈을 직접 import하면 Jest 환경에서 `jest.mock()`으로 모듈을 가로채야 하고, import 체인에 의해 `window.adena` 같은 브라우저 의존성이 함께 로드됩니다.

이를 해결하기 위해 **Context를 통한 의존성 주입** 패턴을 적용했습니다:

- 컴포넌트는 `useWallet()` 훅으로 서비스 함수를 주입받기만 하므로, 함수의 출처를 알지 못함
- 테스트 시 `jest.mock()` 없이 Context Provider에 가짜 함수를 넘기는 것만으로 단위 테스트 가능
- Data Layer는 `WalletProvider` 인터페이스로 추상화되어, `setWalletProvider()`로 구현체 교체 가능

```tsx
// 테스트 예시 — jest.mock() 불필요
render(
  <WalletContext.Provider value={{
    isConnected: true,
    connectWallet: jest.fn().mockResolvedValue("g1abc..."),
    // ...
  }}>
    <ConnectWallet />
  </WalletContext.Provider>
);
```

## 디렉토리 구조

```
src/
├── api/                        # [Data Layer] 지갑 API 호출 (WalletProvider 추상화)
│   └── wallet.ts               # - setWalletProvider, establish, getAccount, doContract
│
├── providers/                  # WalletProvider 인터페이스 구현체
│   └── adena.ts                # - AdenaProvider (window.adena 래핑)
│
├── contexts/                   # React Context (의존성 주입)
│   ├── WalletContext.tsx        # - WalletContextValue 인터페이스 & useWallet() 훅
│   └── WalletContextProvider.tsx # - 서비스 + 스토어를 조립하여 컴포넌트에 주입
│
├── services/                   # [Business Layer] 비즈니스 로직 & 데이터 가공
│   └── wallet.ts               # - connectWallet, getAddress, getBalance, sendGnot
│
├── store/                      # [State] Zustand 전역 상태 관리
│   └── wallet.ts               # - isConnected, toasts
│
├── types/                      # TypeScript 타입 정의
│   └── index.ts                # - WalletProvider, Adena API 응답 타입 등
│
├── utils/                      # 유틸리티 함수
│   └── format.ts               # - formatBalance (잔액 포맷팅)
│
├── styles/                     # 스타일 관련
│   ├── theme.ts                # - 시맨틱 디자인 토큰 (colors, fonts)
│   ├── styled.d.ts             # - styled-components DefaultTheme 타입 확장
│   └── GlobalStyle.ts          # - 전역 스타일 (리셋, 폰트)
│
├── components/                 # [View Layer] UI 컴포넌트
│   ├── common/                 # - 공통 컴포넌트 (Button, Card, CardContent, LoadingBar)
│   ├── ConnectWallet.tsx       # - 지갑 연결
│   ├── GetAddress.tsx          # - 주소 조회
│   ├── GetBalance.tsx          # - 잔액 조회
│   ├── SendGnot.tsx            # - GNOT 전송 (react-hook-form)
│   └── ToastContainer.tsx      # - 트랜잭션 결과 Toast 알림
│
├── App.tsx                     # 루트 컴포넌트 (ThemeProvider, WalletContextProvider)
└── main.tsx                    # 엔트리 포인트
```

## State Management

[Zustand](https://github.com/pmndrs/zustand)를 사용하여 전역 상태를 관리합니다.

| 상태          | 타입      | 설명                                     |
| ------------- | --------- | ---------------------------------------- |
| `isConnected` | `boolean` | 지갑 연결 여부 (버튼 활성화 조건에 사용) |
| `toasts`      | `Toast[]` | 트랜잭션 결과 Toast 목록                 |

- **Client State**: 지갑 연결 상태, Toast 알림 → Zustand store
- **Server State**: 주소, 잔액 → 컴포넌트 로컬 state + Adena API를 통해 조회 (버튼 클릭 시 fetch)

## Theme

시맨틱 디자인 토큰만 최소한으로 정의하여 전역 일관성을 유지합니다.

| 토큰                 | 값               | 용도                             |
| -------------------- | ---------------- | -------------------------------- |
| `colors.active`      | `#2c4be2`        | 주요 버튼, 포커스 보더           |
| `colors.activeHover` | `#2440c8`        | 버튼 호버                        |
| `colors.disabled`    | `#808080`        | 비활성 상태                      |
| `colors.success`     | `#30d158`        | 성공 Toast, 연결 상태 표시       |
| `colors.error`       | `#ff453a`        | 에러 Toast, 폼 유효성 검증       |
| `fonts.sans`         | 시스템 폰트 스택 | GlobalStyle에서 전역 폰트로 사용 |

## Accessibility

웹 접근성(WAI-ARIA)을 고려하여 스크린 리더 및 키보드 사용자를 지원합니다.

### Semantic HTML

- `<header>`, `<main>`, `<section>`, `<form>`, `<fieldset>`, `<output>` 등 시맨틱 태그 사용
- 카드 컴포넌트를 `<section>` + `aria-labelledby`로 제목과 연결
- 조회 결과를 `<output>`으로 마크업 (암묵적 live region)

### Form Accessibility

- `<label htmlFor>` + `id`로 인풋과 라벨 명시적 연결
- `aria-invalid`: 유효성 검증 실패 시 인풋에 에러 상태 전달
- `aria-describedby`: 에러 메시지를 인풋에 연결하여 스크린 리더가 안내
- `role="alert"`: 에러 메시지가 나타날 때 즉시 읽어줌

### Live Regions

- Toast 컨테이너에 `aria-live="polite"` 적용 — 트랜잭션 결과를 스크린 리더가 자동 안내
- 각 Toast에 `role="alert"`로 즉각적인 알림 전달

### Keyboard Navigation

- 모든 인터랙티브 요소에 `:focus-visible` 아웃라인 스타일 적용
- 폼 내 Tab 키로 순차 이동 가능
- 장식적 요소(`StatusDot`, `Suffix`)에 `aria-hidden="true"` 적용

## Libraries

| 라이브러리               | 용도                                 |
| ------------------------ | ------------------------------------ |
| **React 19**             | UI 프레임워크                        |
| **TypeScript**           | 타입 안전성                          |
| **Vite 7**               | 빌드 도구                            |
| **Zustand**              | 경량 전역 상태 관리                  |
| **styled-components v6** | CSS-in-JS 스타일링 (자체 타입 내장)  |
| **react-hook-form**      | Send GNOT 폼 상태 관리 & 유효성 검증 |
| **ESLint + Prettier**    | 코드 린팅 & 포맷팅                   |
