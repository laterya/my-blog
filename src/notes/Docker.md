---
title: Docker 
---

#  命令
以一个实例作为命令的使用演示：启动一个 nginx，并将它的首页改为自己的页面，发布到 DockerHub
分为五个步骤：

1. 下载镜像
2. 启动容器
3. 修改页面（定制化处理）
4. 保存镜像
5. 远程推送
```shell
# 搜索镜像
docker search nginx
# 拉取镜像到本地，默认的版本号为 latest
docker pull nginx:version
# 查看镜像列表
docker images
# 删除镜像
docker rmi nginx:version
```
```shell
# 运行容器, -d 后台运行，-p 进行端口映射
docker run 
docker -d --name mynginx -p 999:80 nginx:latest
# 查看容器列表
docker ps
docker ps -a
# 停止容器
docker stop
# 启动容器
docker start
# 重启容器
docker restart
# 查看容器状态
docker stats
# 查看容器日志
docker logs
# 进入容器，-it 以交互模式
docker exec
docker exec -it mynginx /bin/bash
# 删除容器
docker rm
```
```shell
# 将一个容器提交成一个镜像
docker commit
# 保存镜像为一个压缩包文件
docker save
# 从一个文件中加载镜像
docker load
# 命名镜像
docker tag
# 推送镜像
docker push
```
# 存储
有两种方式将容器内部的文件与本身主机文件进行映射：

1. 目录挂载：`-v /app/myDir:/usr/share/nginx/html`
2. 卷映射：`-v ngconf:/etc/nginx`

目录挂载完全以本主机为主，容器内进行同步；而卷映射当本主机不存在内容时，会将容器内的内容拷贝一份到主机，之后保持同步。区别仅在于启动时若外部为空的处理。
```shell
docker run -d -p 99:80 \
-v /app/nghtml:/usr/share/nginx/html \
-v ngconf:/etc/nginx \
--name app03 \
nginx
# 查看卷列表
docker volume ls
# 查看卷位置
docker volume inspect ngconf
```
# 网络
docker 每启动一个容器都会加入 docker 的默认网络 docker0，在这个网络环境中，可以通过`容器 ip 地址 + 容器的端口号`进行互相访问
```shell
# 查看容器的内容，可以看到ip地址等
docker inspect imageName
```
容器 ip 地址由于各种原因可能会变化，docker0 默认不支持主机域名，可以通过创建自定义网络，实现容器名就是稳定域名进行访问
```shell
# 创建自定义网络
docker network --create
# 加入自定义网络
docker run --network myNet
```
# Docker Compose
```shell
#创建网络
docker network create blog

#启动mysql
docker run -d -p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=123456 \
-e MYSQL_DATABASE=wordpress \
-v mysql-data:/var/lib/mysql \
-v /app/myconf:/etc/mysql/conf.d \
--restart always --name mysql \
--network blog \
mysql:8.0

#启动wordpress
docker run -d -p 8080:80 \
-e WORDPRESS_DB_HOST=mysql \
-e WORDPRESS_DB_USER=root \
-e WORDPRESS_DB_PASSWORD=123456 \
-e WORDPRESS_DB_NAME=wordpress \
-v wordpress:/var/www/html \
--restart always --name wordpress-app \
--network blog \
wordpress:latest
```
```yaml
name: myblog
services:
  mysql:
    container_name: mysql
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=wordpress
    volumes:
      - mysql-data:/var/lib/mysql
      - /app/myconf:/etc/mysql/conf.d
    restart: always
    networks:
      - blog

  wordpress:
    image: wordpress
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_USER: root
      WORDPRESS_DB_PASSWORD: 123456
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress:/var/www/html
    restart: always
    networks:
      - blog
    depends_on:
      - mysql

volumes:
  mysql-data:
  wordpress:

networks:
  blog:
```
```shell
docker compose up
docker compose down
docker compose -f compose.yaml up
```
# Docker file
```shell
FROM openjdk:17

LABEL author=leifengyang

COPY app.jar /app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]
```
```shell
docker build -f dockerfile -t imageName:version .
```
# 实例
## Windows 安装 Docker
> reference：[Windows10安装Docker Desktop（大妈看了都会）-CSDN博客](https://blog.csdn.net/beautifulmemory/article/details/137970794)

1. 下载 Docker Desktop
> 官网地址：[https://desktop.docker.com/win/stable/amd64/Docker%20Desktop%20Installer.exe](https://desktop.docker.com/win/stable/amd64/Docker%20Desktop%20Installer.exe)
> 国内镜像：[https://smartidedl.blob.core.chinacloudapi.cn/docker/20210926/Docker-win.exe](https://smartidedl.blob.core.chinacloudapi.cn/docker/20210926/Docker-win.exe)

2. 启用 Hyper-V 以在 Windows10 上创建虚拟机

![image.png](https://cdn.nlark.com/yuque/0/2024/png/29374551/1718629001825-c39a6c30-968b-4062-820a-9942b4d704b3.png#averageHue=%23faf9f8&clientId=uf01ae70f-7141-4&from=paste&height=562&id=u7c713f2b&originHeight=562&originWidth=1124&originalType=binary&ratio=1&rotation=0&showTitle=false&size=131293&status=done&style=none&taskId=ua449247d-a12c-409c-8706-067f76ec8e8&title=&width=1124)

3. 安装 Docker Desktop

![image.png](https://cdn.nlark.com/yuque/0/2024/png/29374551/1718629687313-681a51c7-ba47-468a-b0df-98b8ca467d3c.png#averageHue=%23fefefe&clientId=u3cb32049-6531-4&from=paste&height=667&id=ua33ccd88&originHeight=667&originWidth=744&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30305&status=done&style=none&taskId=u867e6c3a-7a41-4a82-8609-3eaa54fbf84&title=&width=744)

4. 出现以上问题，打开后台服务，并设置为自启动

![image.png](https://cdn.nlark.com/yuque/0/2024/png/29374551/1718629981583-f04d8f99-6551-40f8-9426-7fab76c2934b.png#averageHue=%23f6f3f1&clientId=u3cb32049-6531-4&from=paste&height=561&id=ud23adc03&originHeight=561&originWidth=804&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67251&status=done&style=none&taskId=u276ba1cb-0aa9-4f22-a65c-deac783ec89&title=&width=804)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29374551/1718630295818-ee13f473-da5c-4b9d-af2c-19f1d53e5019.png#averageHue=%23012456&clientId=u3cb32049-6531-4&from=paste&height=726&id=u4be5d96b&originHeight=726&originWidth=469&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34547&status=done&style=none&taskId=u2d91fb77-38ed-44d9-8cc4-b5ee03cb57b&title=&width=469)

5. 配置镜像源

![image.png](https://cdn.nlark.com/yuque/0/2024/png/29374551/1718631152294-a38e8d63-ac82-4ead-a4a0-f06c2d241cc5.png#averageHue=%23dfbb81&clientId=u113a388d-d2c3-4&from=paste&height=499&id=ue577b4c4&originHeight=499&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38043&status=done&style=none&taskId=ubc0c1f29-2e5d-4407-a70b-e8e7abeeabc&title=&width=986)
## Nginx 安装并映射
```shell
# 运行 nginx 容器，并将配置和页面进行卷映射
docker run -d -p 80:80 \
-v nginxConf:/etc/nginx \
-v nginxHtml:/usr/share/nginx/html \
--restart always \
--name Nginx \
nginx
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29374551/1717842722211-fbda318b-b4a4-4bbe-83b4-f7f461f2b9d3.png#averageHue=%23211e1e&clientId=u922ce990-4985-4&from=paste&height=598&id=u8a1c0d54&originHeight=897&originWidth=1139&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=100245&status=done&style=none&taskId=uc9294af6-8a8a-4a95-93d0-bcce45b624f&title=&width=759.3333333333334)
