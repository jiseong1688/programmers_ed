#!/usr/bin/env bash
echo "레포 통합을 진행합니다."

set -euo pipefail

INPUT="repoList.txt"
BRANCH="main"

if [[ ! -f "$INPUT" ]]; then
  echo "입력 파일을 찾을 수 없습니다: $INPUT" >&2
  exit 1
fi

TOTAL=0
success=0
fail=0

failed_repos=()
failed_logs=()   # Bash 3.x(맥 기본)도 되게 병렬 배열로 저장

RED=$'\e[31m'
BLU=$'\e[34m'
GRN=$'\e[32m'
DEF=$'\e[0m'

while IFS=$' \t' read -r i j _ || [[ -n "${i:-}" ]]; do
  [[ -z "${i:-}" ]] && continue
  [[ "${i:0:1}" == "#" ]] && continue

  TOTAL=$((TOTAL+1))

  # 실패해도 종료하지 않도록 if 안에서 캡처 (stdout+stderr)
  if out=$(git subtree add --prefix="$i" "$j" "$BRANCH" 2>&1); then
    success=$((success+1))
    echo -e "${DEF}${i}---${GRN}성공.${DEF}"
  else
    rc=$?  # git subtree add의 종료코드
    fail=$((fail+1))
    failed_repos+=("$i")
    failed_logs+=("exit code: $rc"$'\n'"$out")
    echo -e "${DEF}${i}---${RED}실패.${DEF}"
  fi
done < "$INPUT"

echo -e "${GRN}성공 ${DEF}${success}개 ${RED}실패 ${DEF}${fail}개 전체 ${TOTAL}개"
echo "-------"
echo "실패한 레포"

for idx in "${!failed_repos[@]}"; do
  r="${failed_repos[$idx]}"
  log="${failed_logs[$idx]}"

  echo -e "${RED}[$((idx+1))]${DEF} $r"
  # 로그 들여쓰기
  while IFS= read -r line; do
    echo "  $line"
  done <<< "$log"
done
