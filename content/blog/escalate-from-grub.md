---
date: 2025-01-18
title: Escalate Privileges from Grub
description: This post records a method of using grub to escalate privileges that was accidentally discovered during the deployment of Cloudflare Tunnel.
tags:
  - Cyber Security
---

## Background

Few days ago, I tried to deploy `Gitea` on my VPS, and enabled SSH connection. However, the SSH connection can expose my IP address, which does harm to privacy and security. So I tried to find ways to hide my IP. Finally, I decided to use Cloudflare Tunnel.

At first, I followed ChatGPT and Cloudflare official document steps to deploy Cloudflare Tunnel, and everything went well in the beginning. But in the next morning, I found that I couldn't connect to my VPS through SSH, and all of my services were down. To address this problem, I logged into the website of the provider, [Greencloud](https://greencloudvps.com/) and tried to reach my VPS through the official terminal. When I launched the terminal, it required me to key in username and password to log in. The username, root, is short and easy to type in, while my password was too long to type in manually. It is worse that Greencloud does not provide copy and paste function in its console. That is, my password blocked myself.

So I had to find ways to log in my VPS. And during this process, I found a way to bypass the password authentication and run bash as root user through grub. Now, I would like to document it.

## Method

Greencloud does not provide copy and paste function, but it offers `Send CtrlAltDel` function, which can force the VPS to reboot, enabling escalate privileges through grub.

In the grub interface, press `e` to edit the commands before booting. By default, the line starting with `linux` may look like:

```bash
linux /boot/xxx root=UUID=xxx ro quiet
```

Then appended a statement to this command like below:

```bash
linux /boot/xxx root=UUID=xxx ro quiet init=/bin/bash
```

In this way, the machine will boot and launch `/bin/bash` as root. Now, press `Ctrl + X` to boot. Then, the screen may look like:

![Run bash as root](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA5gAAACGCAIAAAA3nrKcAAASNklEQVR4nO3dP7LkthHAYa7L51ApsAKXSlXSMfYCk22wJ1P+UgU6igP7Di7dwAFraS7Q3egG8Yfg/L5oHocDNEEQ7IfhkJ9++PHXDX3846d//uff/5odBdpjz2IueiAA7P42O4An++uv/84OAV2wZzEXPRAAdp/OM7I///LbxFAAAAAAP2ZkAQAAsKS/J3//+cfvU+IAAAAAQpiRBQAAwJLSGdndx8fH8fr1eo0K5v/1eio9Byl+ZF9hX56sfHxEW26Ub9TbsN3OwXuWVxR1RWhPNa+l1fJW9frLMfpbsZBQ1c5ykr5x/JnHuWL/qdBq199NdBAwxh+xkFD5RmO2GqxW31+ai9tlH9fi+aviPPgAq/SfruNVw0boPa5aM7Kv12t8FmvkneLKR5DJR7SMQdyofLlWvl3v4BbzKLZknQGbqfWHVstb1RstZ9P7oVGI1s+d7HLOffuI8Bxqdb2aux0mBy2w2wY8Uqs+MKAxn7q/Lm6XfVyf391f1J0HVxcd6ifqN161bYTe4+pdLi04t9r1thP/7xSbLJp6DktVmwR884PQoPWHVsvPFWnZao9ymve3pN5q63YVePQe6FoNjDecC8Dbetuu2DYfG0C+tGBpxtej95EHeT5m/PPw2lfDYhWekA5J9z3KEUOyAzDKxxj77ju+F65u/Ob7N+9U4hSRUX60Xq38vChjuXH8RuMMxa+1f3Q8qVs/j0FbfzPb2d46rd6kNKPd+o38Fe0vDqHO/uPpn1PG1YrxxDi/aP1QKyQ0/lxsH7uchuOAZvB4ZYdUPN33i9N2lxnZg3MMOtrOmAmzq8jXEf8LEWe8zsvrBo6j/GMGwjPu58u1WcNobMf6YjznP+18t7p8+4P9lmszQL3L2SL7yOhv/hmsc5cW39LiDx1T0f0rdv68EK38inq1lT3Dghi2J56G8WsbtUXGk4r1j4V5lxP7RnVn0IpKItequDIsV9Pa8xyneH7ZskMg1D+vjKsXG+qozlOjFqfRDiENjy/xTBeNf5Xx6lz+uaK8NfJykop6x2lbeEb23ARa1rV9G1yStzzNapR/vLUfxoMHzcTr2z/HW7ZdRjtohZzH2eTdl/7buGI72OW/odBZpFV/O597xBEk9JFkter9m3zW08fs0dYmrhwabZPAPFVo8T/4uKjLSBLnnr859ns0OdM6WzTOalqXExdqgVU0tfO4HlDIuagrH281PryU7x6Ln/K/e7fxKkTLN+bGebtEtuHxoLV1RbMux7PV+Ue0hLhVSBXl2wnW9eWt6g2VM7e/ef7xuFLsdmHTjP/FjfKjiUvof30PTzxa/L2PuynatrPWOE3OyhdLaELM1/3tdpOZlLm7o8n4cFF0YqJowHgl/tctvjaMGVcNt7u0ABO9Xq/mfXFk+RWOse8m5XSqd0x4b9h/QrT4V9+urh6W4j/DrOHOxnFU4ZWZHVGNuySy5/6nfYuk9c7eI13y38bdDpIm/wydt6vHWBAtX+sPrZa3qjdaTlHSwW7Y30Q36T93a64jHi3+3u3WybB2To4drd677fdZ3rYdbj4+LNdvjfNXk3yjuU8//Pjr8cfPv/y2P6L2HN/IDD3pi/lb2pS4tn7yrpZSaKmzWH4+m+IMyYjQWU6+3Ohk0ZDEePydOFlnyy42Mra3GJK2ay4ub1VvXTliIfYe9FdtBHMuR9u/+QjVfP+26j/V9Wrle5Ybh1U0zrbxG7tVrNe/fl67uMnF/WiUr41vibrxp5Um/dPZwqH+KZamBS+ub+9H53Jn1cV2KJbTe3zY9MbxxL/KeOWs+rzEzgfGx7lpiSwG6DHIAgDGK47nDPhAJ7f7sRe60r4LYHgFgLZIXuHBefkiZmTnmHXxBgCgLedXzAz1QA8ksgAAAFjSXe5aAAAAAISQyAIAAGBJ4R97Re9A1Iq/3la3K2oSzADVt/kw7onjWd8Tlf82UnYw549UxFmxv0J3zhrfH4z20eIJtb+xfvXx5e9vRnuG7lymLa8YTIwaPeXUlQ8AKArPyM4acKP5025TTvljghlA295iO4h/+tf3ROUv3/jN5lldnMa9Bu34/R+ZeFAk7bN930THmtH2r+5XGn9/E+PX4iy+dbE/2Hv2+n6/z0gCAIsqJ7I9EsF+5Yvnv6S63ls0UnF7RdEW8KyfJCIJI86Gu8POWir+scljrmvwYbRZyWj7X99Mzz8q2qfEqptnsRX9AQBwN4VLCzzTcuJXhMYTILTPer5q1D5rnPmqz8fRr1A9X8XmDTLrW+mX9PSm6vXzbSyufGxvq3wiul1OYj/07KzmX813Et1fHvlxfX2/aHFq5bftD/5GuLLfjdni6f0EAO7JSmS1ZFQ8Sx1/fnx8OMfcfNQWy9FOSHalxtRUNDbPdhnrawuTbfS3m1b7Lik/WW40S2h9Y9s9oYZWPsdTHWe0W4ofqcj+jz/30q4cL0ao2/fbHl1erOL8X4fY/tpHov0tGqdWfsP+kAQciie0353jIQDgTE1ktSzWWDlEO0HmyZ9Wr1FpKFvyqEi87IVtRU+c55Dq1j//udVmRZ4turhdnqjyqlv1n3zXa/28IsikovP2au0TTYzydigmWGLTRftbXZzn8u3ldZy5rLOoZIlzPAQAJORENnoij46zYvnnSZrQKTZJF5pnsX6e2am5ojmovX6nLLZCMaqb9Ict2M8nqogw/0h1b3HSyr9nfwhZpZ8AwFzCj716D51G+a/X62LOVwz+ODfc3P3jvE8Wuxyjn99kvzfJYuEn9ofr4yEAPF6ayF48GyVTCPvrfIk4c3kM1g3H7lZpQbScYenIrLynVT+pXsFJ64eDHZvTqp8P7pCe/bWtkMXerT8YsfUYDwHgeT798OOvxx8///Lb1y+fixfCJpe45bMI4keOJc4LbfML3bR6z8vF4b7uXOXZLjHOUPxafu8/yxbrzeMXNyG0vn8/bqX9Yp/R83ii27VJ/dAglmC/VdcfjCp67Hfn8i24v46Fdsz+/haK0yjfWF7dH0KFe5aL2arneAQA7NJE9s8/fp8YDXarzG+hLfY7AAAhJLIAAABYUvgRtQAAAMAdkMgCAABgSSSyAAAAWBKJLAAAAJaUPtkrdGMaQ6typiveV2hw+QPi2dj7jxDaleLKre6iYNzRbHXRJmp1/DbcNeJdvfcXoe2KfiSk7YnpYZ0QeHPpjGyrI/wZI0Xvm5BHy1/lpujP2PtLq8hic61uxX+E8eYd427Hr73fo+V0fXDDm/ccAIZ0RnYY/jO+J/bIAzTJYnf7wxHyeTuO392sFrhny2uP0riPe7YbgCvURFZ71tROW75JI8XFc57nSTnJwvN4mjwyR3zYWF7+eaEz/ron+jjLN9Y3ytfa4fxW8UlsYjmb3h9CWu2vAcvtTdi+b9K6/ma87vfVbdeJNE20X0X7SXX7+8vZpOPFjj/ZFiMeW7HeYvkV45tTXTvbxM5ZPI60P7cL7QbghoQHIuQn4+Qz2klXfMsuqsgemIrrOPMDe+DzD7Xaefd6+dr60fYXTwlGgWKZnsm5uqZzxu9v51bLo8Ffid/Zn51N6mR8pEmic71fhY7rLdj+0XI8jeNZufmAk/xZPf5EI9l5KoqeF0LHSHEDm7QbgFuxLi14ff+topYDndfJD/W2B7/xn/Rcdjv0DtUoX2z/PVotr71eaUN1/afY/tr+Kvbni5HMUvwH5j7a9qtW2xj9bzNk2FDWY4/XzVM4V7ZLbt5ug8dtAE14r5EV/6XeHef+beCp0YhnFqMdejdLsfzmAQxu/4vxG9l8vr969OfpKeP0AJw69ath+7Eu/lX2TnM9juuG3na/AGtpcx/Z1+sVHbuPXOFJKtoBE2n7i/1Y9MjjFwCwnKuJ7Pl8NuDcP+v0WazX2Q5aOdHtalXOUxXbR9tfg/tzJw0j5+rAHmYdv08dN5KvUI5jeQt23ae2D/Bs6o+9DskF75ty3X2yvpgN1J0O6+KJvs7Lz2u5GOfF8rX17fZPSk52hPinWL7RbtpvI5zbFYpfW3/A8mHxe44vD+dBl5+hm//GpUm/Cu2vVv3H7snGduXx5+/a8RjsekPli+NP9fGrFbL52tMu339caINqw3YDcB9CIjsxGryhx8z5ddqQx7TPRVo7tM22aWcAWEuba2SB98R3jgAATMSMLGaq+KrxbrpuwgPapwnP99dX2od2BoBFkcgCAABgSVxaAAAAgCWRyAIAAGBJ6ZO9oneD0rQqp5PiL5Snx//x7SmpFwvZXzS/Z5OnHM8NcZrXKxYbLbl4+5579moAAN5NOiPb6gy9+pl+bvytfgg/MQu/SSR19WqfWr1XAwDwMOmM7DBz79pIRqJhjwAAgFWoiazxTBpj+SZlJNcf63U80+VczsUnHh0f8Tz5Jvq4nWKc2nadVxYffdSwHYxNyB+/5PxWXYs/X6d44UGTJ2wZ9fLkHgAAVqc+olZ8vuJOe7ak+JZdlIeRz1U/S9NTTrEdtCCj5Rsfz6tIii1+sLplxCWhp5564tc+Et2/0X5Y3W48/wkAgPuw7lqQ5AEf3xjrvF6v5Bz/gFO+OHFb/EinDV+9PZ3xF/tVdH3x42KXBgAAq/BeIytOce32+S1mqkZ6h3aO9quKfvgOzQgAwIO1uY/sMQHmn9xiJgxF0X5V0Q8BAMC6riay53yUHOLQKk1fPd2vjj/ary72w9XbGQCA96T+2OuQ/8o7+a1M8arZ7dpPZOwfSOVx1pWZlxMtP1qO/SMqIy3TfkSVv2t8qrgJzjiLRXn6g1GvP/5oP6xot2h7AgCAroREdmI0XdUlZAAAALinNtfIAgAAAIO90YzsxlfDAAAADzLtEbVTkLwCAAA8BpcWAAAAYEkksgAAAFhS90S24vac42/qyW1EAQAAltP3GlkxO7TvDzrlxljH002v1HtEzr29AAAABhh9acGR5IlPE52YAmqPgypO1jKVCwAAMEU6I5tMK27uJ1Qly1ulp9F4KuK/4ihTfMGkLAAAQD/WI2rP35KLzxQ1lot/5h88KtLWTxZ66o2uL1bk4WwTAAAA9KBeI/vIPKzhZQBkqwAAAHMVfuz1sESt1eaQxQIAAEw3/z6yN08H8x97GZcliC8AAADQw6BENk8HzzcuOC/chqSAzvRU/KC42rEkfwEAAIAe0h97ff3y+fhTm3RM3vXcF9a//mb+Yix/rcXjXz+v0WDci4AfewEAAIwk3LVgYjQAAACA0/xrZAEAAIAKJLIAAABYEoksAAAAlkQiCwAAgCWRyAIAAGBJ3RPZipvC5jd57W18jQAAALio8Ijai8Ts0HPf2cE3Yd1v/mrcI9aD+8gCAACMNPrSgiPJOx7rdc5rJ6aA2kPFipO1TOUCAABMkc7IJtOKm+OJXOLyVulpNJ6K+K84yhRfMCkLAADQj/Bkr3MKqH1dXlwu/pl/8KhIWz9Z6Kk3ur5YkYezTQAAANCDeo3sI/OwhpcBkK0CAADMVfix18MStVabQxYLAAAw3fz7yN48Hcx/7GVcliC+AAAAQA+DEtk8HTzfuOC8cBuSAjrTU/GD4mrHkvwFAAAAekh/7PX1y+fjT23SMXnXc19Y//qb+Yux/LUWj3/9vEaDcS8CfuwFAAAwknDXgonRAAAAAE7zr5EFAAAAKpDIAgAAYEkksgAAAFgSiSwAAACWRCILAACAJXVPZCtuCpvf5LW38TUCAADgosIjai8Ss0PPfWcH34R1v/mrcY9YD+4jCwAAMNLoSwuOJO94rNc5r52YAmoPFStO1jKVCwAAMEU6I5tMK26OJ3KJy1ulp9F4KuK/4ihTfMGkLAAAQD/Ck73OKaD2dXlxufhn/sGjIm39ZKGn3uj6YkUezjYBAABAD+o1so/MwxpeBkC2CgAAMFfhx14PS9RabQ5ZLAAAwHTz7yN783Qw/7GXcVmC+AIAAAA9DEpk83TwfOOC88JtSAroTE/FD4qrHUvyFwAAAOgh/bHX1y+fjz+1ScfkXc99Yf3rb+YvxvLXWjz+9fMaDca9CPixFwAAwEjCXQsmRgMAAAA4zb9GFgAAAKjQ9xG10GjXAXNBAgAAgBMzsgAAAFgSM7JzMPMKAABwETOyAAAAWBKJLAAAAJZEIgsAAIAlkcgCAABgSSSyAAAAWBKJLAAAAJZEIgsAAIAlkcgCAABgSSSyAAAAWBKJLAAAAJZEIgsAAIAlkcgCAABgSSSyAAAAWBKJLAAAAJZEIgsAAIAlkcgCAABgSSSyAAAAWNL/ANUWZensWXoQAAAAAElFTkSuQmCC)

From the screenshot above, it is clear that we have logged in as root. So the next step is to modify the password.

Usually, we can use command `passwd` to modify the password. But in this case, the whole disk is in read-only mode, causing the `passwd` command to fail like below:

![Fail to run `passwd`](data:image/png;base64,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)

So before running `passwd`, it needs to mount the disk with read and write mode at first. The command is below:

```bash
mount -o remount,rw /
```

This command mounts the root directory in read and write mode, and now we can use `passwd` to change the password.

Then, it comes to the final step. Since it is in the booting stage, which means the machine has not started yet, it is not suitable to use `reboot` to restart the system. Instead, we should execute `/sbin/init` to continue booting. So run this command:

```bash
exec /sbin/init
```

After that, we can see the login interface. Now input the username and the new password, and it will log in successfully.

## Prevention

There are many ways to prevent this threat, such as encrypting the disk and encrypting the grub. I would like to introduce the later one here.

To encrypt grub, run the following command to create a password.

```bash
grub-mkpasswd-pbkdf2
```

After inputting the password, it will output a string of hash value. Copy it and then edit the file `/etc/grub.d/40_custom`, append the following content to it:

```bash
set superusers="root"
password_pbkdf2 root your_hash_string
```

Replace the `your_hash_string` with the hash value generated before.

And finally, run `grub-mkconfig -o /boot/grub/grub.cfg` to apply the change.

After that, if someone wants to modify the password through grub, he/she is required to enter the password at first, preventing the escalation of privileges from happening.

---

> Reference <br />
> [ChatGPT](https://chatgpt.com)
