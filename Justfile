dev:
  hugo server --buildDrafts --disableFastRender

format:
  prettier -w "content/**/*.md"

new path:
  hugo new content {{path}}
