---
date: 2025-01-18
title: Escalate Privileges from Grub
description: This post records a method of using grub to escalate privileges that was accidentally discovered during the deployment of Cloudflare Tunnel.
keywords: ["grub","escalate privileges","bypass password"]
icon: uil:linux
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

![Run bash as root](https://img.fovir.fyi/blog/escalate-privileges-from-grub-root.png#center)

From the screenshot above, it is clear that we have logged in as root. So the next step is to modify the password.

Usually, we can use command `passwd` to modify the password. But in this case, the whole disk is in read-only mode, causing the `passwd` command to fail like below:

![Fail to run `passwd`](https://img.fovir.fyi/blog/escalate-privilege-from-grub-fail-to-passwd.png#center)

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
