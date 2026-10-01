# 如何修改 Client Portal Gateway 端口

在某些情况下,用户可能需要修改其 Client Portal Gateway 的端口。最常见的原因是另一个进程已经占用了 Localhost 的 5000 端口。

要修改您的端口,请按以下步骤操作:

1. (可选)如果 Client Portal Gateway 正在运行,请先将其关闭
2. 进入您的 Client Portal Gateway 目录,例如 `C:\Users\{user}\Downloads\clientportal.gw\`
3. 切换到 Client Portal Gateway 的 `root` 目录
4. 使用任意文本编辑器打开 conf.yaml 文件。
5. 将第 4 行的 "listenPort" 从 "5000" 修改为您选择的值。

* 端口 `5001` 是一个通常不会被占用的标准替代选择。

6. 保存文件内容并启动 Client Portal Gateway
