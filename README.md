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
    UI 렌더링 & 이벤트         비즈니스 로직 & 데이터 가공       Adena API 호출
```

- **View Layer**: 사용자 인터랙션 처리, 서비스 호출, 결과 렌더링만 담당
- **Business Layer**: 응답 검증, 에러 처리, 데이터 변환 등 비즈니스 로직 담당
- **Data Layer**: `window.adena` API를 캡슐화하여 순수한 API 호출만 담당 (싱글톤 패턴)

## 디렉토리 구조

```
src/
├── api/                        # [Data Layer] Adena 지갑 API 호출
│   └── wallet.ts               # - window.adena 싱글톤 래퍼 (establish, getAccount, doContract)
│
├── services/                   # [Business Layer] 비즈니스 로직 & 데이터 가공
│   └── wallet.ts               # - connectWallet, getAddress, getBalance, sendGnot
│
├── store/                      # [State] Zustand 전역 상태 관리
│   └── wallet.ts               # - isConnected, address, balance, toasts
│
├── types/                      # TypeScript 타입 정의
│   └── index.ts                # - Adena API 응답 타입 (Response, Account, Transaction 등)
│
├── components/                 # [View Layer] UI 컴포넌트
│   ├── common/                 # - 공통 컴포넌트 (Button, Card)
│   ├── ConnectWallet.tsx       # - 지갑 연결
│   ├── GetAddress.tsx          # - 주소 조회
│   ├── GetBalance.tsx          # - 잔액 조회
│   ├── SendGnot.tsx            # - GNOT 전송 (react-hook-form)
│   └── ToastContainer.tsx      # - 트랜잭션 결과 Toast 알림
│
├── App.tsx                     # 루트 컴포넌트 (헤더, 레이아웃, 글로벌 스타일)
└── main.tsx                    # 엔트리 포인트
```

## State Management

[Zustand](https://github.com/pmndrs/zustand)를 사용하여 전역 상태를 관리합니다.

| 상태 | 타입 | 설명 |
|---|---|---|
| `isConnected` | `boolean` | 지갑 연결 여부 (버튼 활성화 조건에 사용) |
| `address` | `string \| null` | 연결된 계정 주소 |
| `balance` | `string \| null` | 계정 잔액 |
| `toasts` | `Toast[]` | 트랜잭션 결과 Toast 목록 (3초 후 자동 제거) |

- **Client State**: 지갑 연결 상태, Toast 알림 → Zustand store
- **Server State**: 주소, 잔액 → Adena API를 통해 조회 (버튼 클릭 시 fetch)

## Libraries

| 라이브러리 | 용도 |
|---|---|
| **React** | UI 프레임워크 |
| **TypeScript** | 타입 안전성 |
| **Zustand** | 경량 전역 상태 관리 |
| **styled-components** | CSS-in-JS 스타일링 |
| **react-hook-form** | Send GNOT 폼 상태 관리 & 유효성 검증 |
| **Vite** | 빌드 도구 |
| **ESLint + Prettier** | 코드 린팅 & 포맷팅 |
