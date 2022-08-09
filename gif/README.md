
# 通过canvas处理gif动画来控制暂停、播放、帧等

## 构造函数选项  
gif - 必需。img 标签的 DOM 元素。  
loop_mode - 可选。将此设置为 false 将强制禁用 gif 循环。  
auto_play - 可选。与上面的 rel:auto_play 属性相同，此 arg 覆盖 img 标签信息。  
max_width - 可选。将 max_width 上的图像缩放到 max_width。对手机很有帮助。  
rubbable - 可选。让它变得可擦。  
on_end - 可选。当 gif 到达单个循环（一次迭代）结束时添加回调。传递的第一个参数是 gif HTMLElement。  
loop_delay - 可选。每个单循环（迭代）后暂停的时间量（以毫秒为单位）。  
progressbar_height - 可选。进度条的高度。  
progressbar_background_color - 可选。进度条的背景颜色。
progressbar_foreground_color - 可选。进度条的前景色。
## 实例方法
 加载
load( callback ) - 将 img 标签的 src 或 rel:animated_src sttribute 指定的 gif 加载到画布元素中，如果通过则调用回调   
load_url( src, callback ) - 将 src 参数中指定的 gif 文件加载到画布元素中，然后在传递时调用回调  
## 播放控制
play - 开始播放 gif  
pause - 停止播放 gif  
move_to(i) - 移动到 gif 的第 i 帧  
move_relative(i) - 向前移动 i 帧（如果 i < 0 则向后移动）  
## 监听
get_canvas - 正在播放 gif 的画布元素。便于分配事件处理程序。  
get_playing - gif 当前是否正在播放  
get_loading - gif 是否已完成加载/解析  
get_auto_play - gif 是否设置为自动播放  
get_length - gif 中的帧数  
get_current_frame - gif当前显示帧的索引  
## 警告：同域起源  
gif 必须与您正在加载的页面位于同一域（以及端口和协议）上。  

该库通过解析 js 中的 gif 图像数据、提取单个帧并将它们呈现在画布元素上来工作。无法从正常的图像加载中获取原始图像数据，因此该库对图像执行 XHR 请求并强制 MIME 类型为“text/plain”。因此，使用这个库与任何其他 XHR 请求一样受到所有相同的跨域限制。