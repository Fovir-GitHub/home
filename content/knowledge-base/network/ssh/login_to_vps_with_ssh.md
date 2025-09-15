---
title: Log in VPS with SSH
date: 2025-07-15
icon: solar:server-bold
description: Introduce how to log in VPS with SSH identity file.
order: 0
---

## Background

For security reasons, it is recommended to log in VPS or cloud server with SSH identity file rather than password. And this post will show how to do that.

## Generate SSH Key

The first step is to generate an SSH key on the client by running the following command in the terminal.

```sh
ssh-keygen -t ed25519 -C "your-email@example.com" -f "/path/to/ssh"
```

The `-t` flag determines the algorithm to be used.

The `-C` flag stands for `Comment`, which usually filled with email.

The `-f` flag is used to specify the path to store the SSH key. Without this argument, this command will ask for path during generation process.

After that, the SSH key will be generated and be stored under the path previously given.

## Upload to Server/VPS

After creating a local SSH key, it is time to upload it to the remote server so that the client is able to connect without password.

The first step is to ensure that the client can connect to the server via password. Edit the SSH configuration file stored in `/etc/ssh/sshd_config`. Ensure the following configurations are right:

```ini
PasswordAuthentication yes

# If you want to log in as root, then set this to `yes`.
PermitRootLogin yes
````

Then run the following command to restart the SSH service.

```sh
sudo systemctl restart ssh
```

After that, switch back to the client. Go to the path of SSH key, for example, `~/.ssh/vps/`. And there will be two files, one has `.pub` extension name while another does not have. The goal is to upload the file with `.pub` extension name to the server. Run the following command:

```sh
ssh-copy-id -i ./<filename>.pub -p <port> <username>@<IP>
```

The flag `-i` determines which public key file to upload.

The `-p` flag specifies the port. Without this flag, it will use the port 22 by default.

The final argument is the username and the IP of server. For example, if the username is `root` and the IP is `1.1.1.1`, then it can be written as `root@1.1.1.1`.

After pressing enter, the command will ask for the password of the server's user, which will be the last time to input the password. Then the public key will be successfully uploaded.

## Server Configuration

It is more secure to disable password log in function in the server side. So go back to the configuration file to set:

```ini
PasswordAuthentication yes

# Disable log in as root via password.
PermitRootLogin prohibit-password
````

Then restart SSH with the following command:

```sh
sudo systemctl restart ssh
```

## Client Configuration

### Use Terminal

Instead of typing a long command to connect to the server in terminal, like using `ssh username@IP`, there is a more simple way to do so. Open the `~/.ssh/config` file, and add the configuration. For example:

```ini
Host VPS
  HostName 1.1.1.1
  Port 2222
  User root
  IdentityFile ~/.ssh/vps/key
  IdentitiesOnly yes
```

The `Host` can be any name. The `HostName` is the IP address of the server and the `Port` is the port of SSH service. The `User` is the username to log in. And the `IdentityFile` is the path to private key, which is the file without `.pub` extension name.

This configuration enables client to simply type `ssh VPS` to connect to the server in the terminal.

### Use `Remmina`

[Remmina](https://remmina.org/) is a free and open source remote desktop client. It is also available for SSH connection.

In the main window of `Remmina`, add a new configuration and select `SSH - Secure Shell` in the `Protocol` field. Then fill the information required below. And the `Authentication type` can be set to `SSH identity file`, which enables users to authenticate via SSH private key by selecting the key file in the `SSH identity file` field.

