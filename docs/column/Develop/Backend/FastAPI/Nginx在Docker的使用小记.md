# Nginx与Docker

>   参考文章: https://juejin.cn/post/7250710949140480057

## 前置资源

在docker中pull下来nginx镜像![image-20240506161343274](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405061613803.png)

然后配置对应的端口，这里的意思是宿主极的1234端口映射到Nginx容器中的80端口。现在可以`Run`起来了。![image-20240506161508953](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405061615008.png)

访问http://localhost:1234，可以看见Nginx服务跑起来了。

![image-20240506161729042](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405061617118.png)

## 配置Nginx

### 反代

用Nginx怎能不用其反代功能，这是啥意思？

就是配置多个端口，可以同时访问这个网站。这里引入下面的nginx配置进行说明：

```nginx
upstream my_web {
  server 192.168.1.6:3000;
  server 192.168.1.6:3001;
}
```

这样访问3000端口和3001端口的效果都是一样的，所以这就是`将流量分配到多个后端服务器，实现负载均衡和提高性能。`下面是Nginx反向代理的优点：

>   1.  **负载均衡**：将流量分配到多个后端服务器，实现负载均衡和提高性能。
>   2.  **安全**：隐藏后端服务器的真实 IP，减少它们直接暴露在互联网上的风险。
>   3.  **缓存**：在反向代理服务器上缓存内容，以减少后端服务器的负载并提高客户端的响应速度。
>   4.  **SSL终止**：反代服务器可以处理 SSL 加密，从而简化后端服务器的配置。

那去哪里寻找nginx的配置文件呢？

在 `/etc/nginx/nginx.conf`是默认的主配置文件。

然后在`/etc/nginx/conf.d/**.conf`这些配置文件是子配置文件。（如`/etc/nginx/conf.d/default.conf`）

具体看下子配置文件，这里看`default.conf`文件。

![image-20240507140242742](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405071402853.png)

这里的`location`就是对应的路由配置。这什么意思呢？

比如这里的配置：

```nginx
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
```

 `/`表示配置了这里的所有路由，在`root`权限指定的目录查找。具体到实际意思就是对`http://localhost/aaa.hml`而言是从`/usr/share/nginx/html/aaa.html`拿到的。

现在有一个需求：当我访问3000和3001端口的时候如何定到同一个web呢？

其实这个很简单啊，看一眼下面的配置就会啦。

```nginx
upstream nest-server {
    server 192.168.64.1:3000;
    server 192.168.64.1:3001; # 这里的ip地址与下面的host.docker.internal相同作用，均是定位到宿主机在本地网络中分配到的ip地址
    # server host.docker.internal:3001;  
}

server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location ^~ /api {
        proxy_pass http://nest-server;  # 这里的nest-server与上面的upstream相同
  } 
  。。。
}
```

上面的作用是访问http://localhost:1234/api这个地址的时候会将流量均分给`3000`和`3001`端口。

![image-20240507153228768](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405071532879.png)

好了，由一开始的nginx容器的配置可以知道，端口是由宿主机1234端口映射到容器的80端口，接下来启动了两个不同端口的web服务后访问http://localhost:1234/api即可根据nginx配置的策略定位到不同的后端服务器上。![image-20240507164305102](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405071643195.png)

简言之，我们可以在下面的代码中配置不同的后端服务器，用以提供服务（当然每台服务器都启动了对应的Web应用并开启了对应的端口）

```nginx
upstream nest-server {
    server 192.168.64.1:3000;
    server 192.168.64.1:3001;
    # server host.docker.internal:3001;
}
```

这篇文章介绍的是一个单机部署Nginx配置多后端服务器的例子。![image-20240507164831054](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405071648121.png)



















