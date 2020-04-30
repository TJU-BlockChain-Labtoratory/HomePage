import style from './style';
function nextPage(currPage){
    if(window !== undefined){
        if(currPage == window.localStorage.totalPage-1){
                alert("this is the last page!");
                return;
            }
            window.localStorage.currPage = (currPage+1).toString();
            window.location.reload();
    }
    
}

function prePage(currPage){
    if(window !== undefined){
        console.log(currPage);
        if(currPage == 0){
            alert("this is the first page!");
            return;
        }
        else{
            window.localStorage.currPage = (currPage-1).toString();
            window.location.reload();
        }
    }
}

function toPage(destPage){
    if(window !== undefined){
        if(destPage < 0 || destPage >= window.localStorage.totalPage){
            alert("page "+destPage+" isn't exist!");
            return;
        }
        
        else{
            console.log(destPage);
            window.localStorage.currPage = destPage.toString();
            window.location.reload();
        }    
    }
    
   
}


export {nextPage , prePage, toPage};