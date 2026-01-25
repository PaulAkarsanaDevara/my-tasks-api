#!/bin/sh

OUTPUT=$(npx --no-install commitlint --edit "$1" 2>&1)
STATUS=$?

if [ $STATUS -ne 0 ]; then
  echo ""
  echo "❌ FORMAT COMMIT TIDAK VALID"
  echo ""
  echo "Gunakan format berikut:"
  echo ""
  echo "  feat(auth): add JWT refresh token"
  echo "  fix(todo): prevent duplicate task creation"
  echo "  refactor(user): simplify validation logic"
  echo "  chore(ci): update github actions"
  exit 1
fi
