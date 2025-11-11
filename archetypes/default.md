---
# prettier-ignore
date: {{ dateFormat "2006-01-02" .Date }}
title: {{ replace .File.ContentBaseName "-" " " | title }}
description:
weight: {{ add (len (where (where $.Site.RegularPages "File.Dir" .File.Dir) "Draft" false)) 2 }}
---
