const delayAlp = 70, delayLine=4000;

const typing_forward = (text,index,taglineTarget)=>{
    if(index > text.length) return;
    var sliced = text.slice(0,index);
    return setTimeout(()=>{
        $(taglineTarget).html(sliced);
        typing_forward(text, index+1, taglineTarget);
    },delayAlp);
}

const typing_reverse = (text,index,taglineTarget)=>{
    if(index < 0) return;
    var sliced = text.slice(0,index);
    // console.log(index,sliced);
    return setTimeout(()=>{
        $(taglineTarget).html(sliced);
        typing_reverse(text, index-1, taglineTarget);
    },delayAlp/2);
}

const typing = (ar, arIndex, taglineTarget)=>{
    if(arIndex >= ar.length) return;
    var text = ar[arIndex];
    var forward_time = delayAlp*text.length+delayLine;
    var reverse_time = delayAlp*text.length+delayLine+delayAlp/2*text.length+ 300;
    typing_forward(text, 0, taglineTarget);
    setTimeout(()=>
        typing_reverse(text, text.length, taglineTarget)
    , forward_time)
    return setTimeout(()=>{
        typing(ar, (arIndex+1 < ar.length)?arIndex+1:0, taglineTarget)
    },reverse_time)
}

const typeAction = ()=>{
    var ar = [
        "Welcome to BettorSight",
        "The Future of Sports Data",
        "Where you choose what data you want to see"
    ]
    typing(ar,0,'.tagline');
    
}

$(document).ready(()=>{
    const paths = document.querySelectorAll('svg .path.bettorsight');
    var css = ``, initDelay = 3, eachDuration = 1, eachDelay=-0.2;
    paths.forEach((path, index)=>{
        var pathTot = path.getTotalLength();
        css += `
        .path.bettorsight.loc_${index}{
            stroke-dasharray: ${pathTot}px;
            stroke-dashoffset: ${pathTot}px;
            animation: ${eachDuration}s anim_bettorsight_loc_0 forwards ease ${initDelay+=eachDuration+eachDelay}s;
        }
        
        @keyframes anim_bettorsight_loc_${index}{
            from{
                stroke-dashoffset: ${pathTot}px;
            }
            to{
                stroke-dashoffset: 0px;
            }
        }
        `;
    })
    // css+=`
    //     @keyframes anim_fill{
    //         from{
    //             fill:
    //         }
    //         to{
    //             stroke-dashoffset: 0px;
    //         }
    //     }
    //     .path.bettorsight{
    //         animation: 0.5s anim_fill forwards ease ${initDelay}s;
    //     }
    // `;
    console.log(css);
    setTimeout(()=>{
        $('.path.bettorsight').css({'fill':'white'});
    },initDelay*1000);
    var taglineTarget = '.tagline';
    setTimeout(()=>{
        typeAction();
    },9000)
})
