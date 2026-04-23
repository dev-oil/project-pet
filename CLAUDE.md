# Project: project-pet

## 커밋 컨벤션

커밋 메시지는 반드시 이슈 번호를 가장 앞에 붙인다:

```
[#이슈번호] type: 설명
```

### 예시

```
[#34] chore: Jest + RTL 환경 세팅
[#35] feat: Route Handler 기반 API 프록시 구성
[#32] fix: App Router 라우팅 오류 수정
```

### type 목록

- `feat` — 새 기능
- `fix` — 버그 수정
- `chore` — 빌드/설정/패키지 작업
- `refactor` — 기능 변경 없는 코드 개선
- `docs` — 문서
- `style` — 포맷/스타일
- `test` — 테스트 추가/수정

## 이슈 작성 규칙

이슈 생성 시 반드시 `.github/ISSUE_TEMPLATE/`의 템플릿을 사용한다:

- 버그 → `bug_report.md` → 제목 `[BUG] ...`, 라벨 `bug`
- 새 기능 → `feature_request.md` → 제목 `[FEAT] ...`, 라벨 `enhancement`
- 설정/리팩토링 등 → `task.md` → 제목 `[CHORE] ...`, 라벨 `chore`

## GitHub 저장소

- repo: `dev-oil/project-pet`
- 기본 브랜치: `main`

## 브랜치 네이밍

```
{type}/#${이슈번호}-{설명-케밥케이스}
```

예: `feature/#34-jest-rtl-setup`, `fix/#29-favorites-stale-data`
