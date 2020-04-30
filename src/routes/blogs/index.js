import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import style from './style';
import { nextPage, prePage,toPage} from './functions.js'
import { useEffect } from 'preact/hooks';

const numOfNews = 3;

const blogs = (props) => {
	const [data, isLoading] = usePrerenderData(props);
	var currPage;
	useEffect(() => {
		if(typeof window !== "undefind"){
			currPage = Number(window.localStorage.currPage);
		}
		else{
			currPage = 0;
		}
	},[]);

	return (
	<div>
		<div class={style.pageNewsAndNotices}>
			<h1 class={style.pageTitle}>新闻动态</h1>
			{ getNewsListing(data, isLoading,numOfNews, currPage) }
		</div>
	</div>
	);
};

function getNewsListing(data, isLoading ,pageSize, currPage) {
	

	if (isLoading) {
		return (
			<article class={style.loadingPlaceholder}>
				<h2 class={`${style.blogtitle} loading`}>&nbsp;</h2>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
			</article>
		);
	}
	if (data && data.data) {
		
		
			
			const { data: blogs } = data;
			var news = new Array();
			var j = currPage * pageSize;

			for(let i = j; i < blogs.edges.length; i++ ){
				var temp = blogs.edges[i].details.tags.split(',');
				let judge = temp.every(function (temp){
					return temp != "achievement";
				});
				if(judge == true){
					
						news[j] = blogs.edges[i];
						j++;
					
					if( j >= ((currPage+1)*pageSize)){
						break;
					}
				}		     
			}

			if(typeof window !== "undefind" && window.localStorage.total == "undefind"){
				let total = blogs.edges.length;
				window.localStorage.setItem("total",total.toString());
			}
			if(typeof window !== "undefind" && window.localStorage.totalPage == "undefind"){
				let totalPage = Math.ceil(blogs.edges.length/pageSize); 
				window.localStorage.setItem("totalPage",totalPage.toString());
			}

			return (
				<div>
					<div>
						{news.map(blog => (
						<Link href={`/blog/${blog.id}`}>
							<article class={style.block}>
								<h2>{blog.details.title}</h2>
								<div>
									{
										<span class={style.tag}>{blog.details.tags.split(",")[0]}</span>
									}
								</div>
								<p class={style.preview}>
									{blog.preview}
								</p>
							</article>
								
						</Link>
					))}
					</div>
					<div>
						
						{ getIndex()}
					</div>
				</div>
			);
		}
		
	
}




function getIndex(){
	if(typeof window !== "undefind"){
		var currPage = Number(window.localStorage.currPage);
		var firstPage = Math.max(1,currPage-1);

		var lastPage = Math.min(window.localStorage.totalPage , firstPage+7);
	
	var arr = new Array(lastPage-firstPage+1);
    for(let i = 0 ; i < arr.length ; i++){
        arr[i] = i;
    }

	return (
		<div class={style.indexContainer}>
			<div class={style.pagination}>
				<ul class={style.index}>
					<li><a href =""onClick={() => prePage(currPage)}>«</a></li>
					{
						arr.map((value) =>{
							if(value+firstPage == currPage+1){
								return <li><a class={style.active}>{value+firstPage}</a></li>
							}
							return <li><a href="" onClick={()=>toPage(value+firstPage-1)}>{value+firstPage}</a></li>
						})
					}
					<li><a href =""onClick={() => nextPage(currPage)}>»</a></li>
				</ul>
			</div>
		</div>	
	);
	}
}
export default blogs;
