GitHub 이슈 목록을 보여줘.

다음 명령어를 실행하고 결과를 깔끔하게 정리해서 보여줘:

```
gh issue list --repo dev-oil/project-pet --state open --limit 30
```

출력 형식:
- 이슈 번호, 제목, 라벨, 생성일을 표로 정리
- 번호 순으로 정렬
- 닫힌 이슈는 제외
