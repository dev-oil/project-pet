변경사항을 커밋만 한다. (푸시/PR 생성 없음)

$ARGUMENTS 에 이슈 번호가 주어진다. (예: `/commit 34`)
이슈 번호 없이 호출하면 현재 브랜치명에서 이슈 번호를 자동으로 추출한다.

## 커밋 컨벤션 (필수 준수)

```
[#이슈번호] type: 설명
```

- 예: `[#34] chore: Jest + RTL 환경 세팅`
- type: feat / fix / chore / refactor / docs / style / test

## 절차

### Step 1: 이슈 번호 확인
- $ARGUMENTS가 있으면 그 값을 사용
- 없으면 현재 브랜치명에서 `#숫자` 패턴으로 추출
  ```
  git branch --show-current
  ```
- 브랜치명에서도 이슈 번호를 찾을 수 없으면 이슈 번호 없이 진행 (커밋 메시지: `type: 설명`)

### Step 2: 변경사항 파악
```
git status
git diff --staged
git diff
```

### Step 3: 이슈 정보 조회 (이슈 번호가 있을 때만)
```
gh issue view {이슈번호} --repo dev-oil/project-pet --json number,title,body
```

### Step 4: 커밋 메시지 생성
- 변경사항을 분석해 적절한 type 선택
- 이슈 번호가 있으면: `[#이슈번호] type: 한국어 설명`
- 이슈 번호가 없으면: `type: 한국어 설명`
- 사용자에게 커밋 메시지를 먼저 보여주고 확인 받은 후 진행

### Step 5: 스테이징 및 커밋
```
git add {변경된 파일들}  # -A 대신 명시적으로 추가
git commit -m "[#이슈번호] type: 설명"
```
