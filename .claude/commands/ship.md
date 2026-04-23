변경사항을 커밋하고 PR을 자동으로 생성한다.

$ARGUMENTS 에 이슈 번호가 주어진다. (예: `/ship 34`)
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
- 브랜치명에서도 이슈 번호를 찾을 수 없으면 이슈 번호 없이 진행 (커밋 메시지: `type: 설명`, PR 본문에서 `closes` 생략)

### Step 2: 변경사항 파악
```
git status
git diff --staged
git diff
```

### Step 3: 이슈 정보 조회
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

### Step 6: 푸시
```
git push -u origin {현재 브랜치}
```

### Step 7: PR 생성
- PR 제목: `[#이슈번호] type: 설명` (커밋 메시지와 동일)
- PR 본문은 `.github/PULL_REQUEST_TEMPLATE.md` 형식을 그대로 따른다:
  ```
  ## 관련 이슈
  closes #이슈번호

  ## 작업 내용
  (변경사항 요약)

  ## 변경 유형
  - [ ] fix
  - [ ] feat
  - [ ] refactor
  - [ ] style
  - [ ] chore

  ## 체크리스트
  - [ ] 로컬 동작 확인
  - [ ] console.log 제거

  ## 스크린샷 (UI 변경 시)
  ```
- 변경 유형 항목 중 해당하는 것에 `[x]` 체크
- UI 변경이 없으면 스크린샷 섹션 제거

```
gh pr create --repo dev-oil/project-pet --title "..." --body "..."
```

### Step 8: PR URL을 사용자에게 알려준다.
