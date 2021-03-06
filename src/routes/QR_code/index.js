import { h } from "preact";
import { useEffect } from 'preact/hooks';
import style from "./style";
import Bottom from '../../components/bottom';
import { Link } from 'preact-router';

const QR_code = () => {


	return (
		<div >
		<div class={style.pageNewsAndNotices}>
				<Link class={style.pageTitle} href={`/blogs/${0}`}>新闻动态</Link>
				<Link class={style.pageTitle} href="/QR_code">行业洞察</Link>  
			</div>
		<div class={style.home}>
			<div class={style.about}>
			
			<div class={style.quote}>
					<div class={style.details}>
						<h3>&emsp;&emsp;获取更多行业信息，欢迎扫描二维码进入公众号"aelf社区"</h3>
					</div>
			</div>
				<div class={style.imageContainer}>
					<div class={style.image} />
				</div>
			</div>
		</div>
		<Bottom></Bottom>
		</div>
	);
};

export default QR_code;

