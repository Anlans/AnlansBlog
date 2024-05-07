import{_ as e,c as t,o as a,a1 as o}from"./chunks/framework.DyEXnO_p.js";const T=JSON.parse('{"title":"http协议特性","description":"","frontmatter":{},"headers":[],"relativePath":"column/Develop/Backend/FastAPI/http协议.md","filePath":"column/Develop/Backend/FastAPI/http协议.md"}'),s={name:"column/Develop/Backend/FastAPI/http协议.md"},h=o('<h1 id="http协议特性" tabindex="-1">http协议特性 <a class="header-anchor" href="#http协议特性" aria-label="Permalink to &quot;http协议特性&quot;">​</a></h1><p>推荐先看这篇教程：<a href="https://cs.fyi/guide/http-in-depth" target="_blank" rel="noreferrer">https://cs.fyi/guide/http-in-depth</a></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>1.http协议是基于TCP/IP协议之上的应用层协议</p><p>2.基于 请求 -- 响应模式</p><blockquote><p>先有<code>请求</code>再有<code>响应</code>。 HTTP协议规定的是，从客户端发出<code>请求</code>，最后服务器端<code>响应</code>该请求并返回。</p><p>socket是全双工的</p></blockquote><p>3.无状态保存</p><blockquote><p>HTTP是一种不保存状态,即无状态(stateless)协议。HTTP协议 自身不对请求和响应之间的通信状态进行保存。也就是说在HTTP这个 级别,协议对于发送过的请求或响应都不做持久化处理。使用HTTP协议,每当有新的请求发送时,就会有对应的新响应产 生。协议本身并不保留之前一切的请求或响应报文的信息。这是为了更快地处理大量事务,确保协议的可伸缩性,而特意把HTTP协议设计成 如此简单的。</p></blockquote><p>4.短连接</p><blockquote><p>HTTP1.0默认使用的是短连接。浏览器和服务器每进行一次HTTP操作，就建立一次连接，任务结束就中断连接。 HTTP/1.1起，默认使用长连接。要使用长连接，客户端和服务器的HTTP首部的Connection都要设置为keep-alive，才能支持长连接。 HTTP长连接，指的是复用TCP连接。多个HTTP请求可以复用同一个TCP连接，这就节省了TCP连接建立和断开的消耗。</p></blockquote><h2 id="http请求协议与响应协议" tabindex="-1">http请求协议与响应协议 <a class="header-anchor" href="#http请求协议与响应协议" aria-label="Permalink to &quot;http请求协议与响应协议&quot;">​</a></h2><p>关注业务，使用socket就可以完全没必要自己对底层逻辑实现。</p><img src="https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202312201730133.png" alt="image-20231220173023048" style="zoom:50%;"><p>那web开发，通信双方基于TCP协议</p><p><img src="https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202312202139688.png" alt="image-20231220213911644"></p><h4 id="tcp连接的三次握手" tabindex="-1">TCP连接的三次握手 <a class="header-anchor" href="#tcp连接的三次握手" aria-label="Permalink to &quot;TCP连接的三次握手&quot;">​</a></h4><blockquote><p>Three-way handshake in it’s simples form is that all the TCP connections begin with a three-way handshake in which the client and the server share a series of packets before starting to share the application data. 三次握手的简单形式是，所有的TCP连接开始都是三次握手，客户端和服务器在开始共享应用程序数据之前共享一系列数据包。下面介绍具体的步骤：</p><ul><li>SYN - Client picks up a random number, let’s say x, and sends it to the server. 客户端随机选取一个数字，比如x，然后将其发送到服务器。</li><li>SYN ACK - Server acknowledges the request by sending an ACK packet back to the client which is made up of a random number, let’s say y picked up by server and the number x+1 where x is the number that was sent by the client SYN ACK -服务器通过向客户端发送一个ACK数据包来确认请求，该数据包由一个随机数组成，比如说服务器接收的y和x+1，其中x是客户端发送的数字</li><li>ACK - Client increments the number y received from the server and sends an ACK packet back with the number y+1 ACK -客户端增加从服务器接收到的数字y，并发送回一个数字为y+1的ACK数据包</li></ul><p>Once the three-way handshake is completed, the data sharing between the client and server may begin. It should be noted that the client may start sending the application data as soon as it dispatches the last ACK packet but the server will still have to wait for the ACK packet to be recieved in order to fulfill the request. 一旦三次握手完成，客户端和服务器之间的数据共享就可以开始。应该注意的是，客户端可以在它分派最后一个ACK分组时立即开始发送应用数据，但是服务器将仍然必须等待ACK分组被接收以便满足请求。</p></blockquote><p><img src="https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202312202151667.png" alt="3 way handshake"></p>',18),n=[h];function c(i,p,r,l,d,u){return a(),t("div",null,n)}const b=e(s,[["render",c]]);export{T as __pageData,b as default};
