이슈 번호를 기반으로 브랜치를 생성하고 체크아웃한다.

$ARGUMENTS 에 이슈 번호가 주어진다. (예: `/branch 34`)

## 절차

1. 다음 명령어로 이슈 정보를 가져온다:
   ```
   gh issue view $ARGUMENTS --repo dev-oil/project-pet --json number,title,labels
   ```

2. 이슈 제목과 라벨을 기반으로 브랜치 타입을 결정한다:
   - labels에 `enhancement` → `feature`
   - labels에 `bug` → `fix`
   - labels에 `chore` → `chore`
   - 기타 → `feature`

3. 브랜치명을 생성한다:
   - 형식: `{type}/#${이슈번호}-{이슈제목-영문-케밥케이스}`
   - 이슈 제목이 한글이면 핵심 키워드를 영문으로 변환
   - 예: `feature/#34-jest-rtl-setup`

4. 브랜치를 생성하고 체크아웃한다:
   ```
   git checkout -b {브랜치명}
   ```

5. 생성된 브랜치명을 사용자에게 알려준다.
