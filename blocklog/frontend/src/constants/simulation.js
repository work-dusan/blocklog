export const USERS = ["ana.jovic", "marko.petrovic", "admin", "hacker"];

export const FILE_CONTENTS = {
  "/etc/passwd": `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
ana.jovic:x:1001:1001:Ana Jovic:/home/ana.jovic:/bin/bash
marko.petrovic:x:1002:1002:Marko Petrovic:/home/marko.petrovic:/bin/bash
admin:x:1000:1000:System Administrator:/home/admin:/bin/bash`,

  "/var/log/syslog": `May 26 09:00:01 server CRON[1234]: (root) CMD (run-parts /etc/cron.hourly)
May 26 09:15:32 server sshd[2341]: Accepted publickey for admin from 192.168.1.10
May 26 09:22:11 server sudo[2456]: admin : USER=root ; COMMAND=/bin/cat /etc/passwd
May 26 09:47:03 server sshd[2891]: Failed password for invalid user root from 10.0.0.5
May 26 10:01:55 server kernel: [UFW BLOCK] IN=eth0 SRC=203.0.113.5 DST=192.168.1.1
May 26 10:23:44 server sshd[3012]: Accepted password for marko.petrovic from 192.168.1.22`,

  "/home/documents/report.pdf": `Q1 Financial Report — CONFIDENTIAL
=====================================
Revenue:      $2,847,392
Expenses:     $1,923,441
Net Profit:     $923,951

Department Breakdown:
  Engineering:   $842,200
  Marketing:     $391,800
  Operations:    $689,441

Prepared by: Finance Department
Classification: INTERNAL USE ONLY`,
};

export const FILES = [
  "/etc/passwd",
  "/var/log/syslog",
  "/home/documents/report.pdf",
];

export const PASSWORDS = {
  "ana.jovic": "1234",
  "marko.petrovic": "1234",
  admin: "admin",
  hacker: "hack123",
};
