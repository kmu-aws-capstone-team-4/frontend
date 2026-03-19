#!/bin/bash
components=("Card" "Badge" "Avatar" "Icon" "Select" "Modal" "Toast")

for component in "${components[@]}"; do
  git add "src/shared/ui/$component"
  git commit -m "feat: $component 컴포넌트 추가 및 구현"
done
