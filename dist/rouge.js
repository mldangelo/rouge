var m=[/\b(can)(not)\b/i,/\b(d)('ye)\b/i,/\b(gim)(me)\b/i,/\b(gon)(na)\b/i,/\b(got)(ta)\b/i,/\b(lem)(me)\b/i,/\b(more)('n)\b/i,/\b(wan)(na) /i,/\ ('t)(is)\b/i,/\ ('t)(was)\b/i],b=["jr","mr","mrs","ms","dr","prof","sr","sen","corp","rep","gov","atty","supt","det","rev","col","gen","lt","cmdr","adm","capt","sgt","cpl","maj","miss","misses","mister","sir","esq","mstr","phd","adj","adv","asst","bldg","brig","comdr","hon","messrs","mlle","mme","op","ord","pvt","reps","res","sens","sfc","surg"],y=["arc","al","exp","rd","st","dist","mt","fy","pd","pl","plz","tce","llb","md","bl","ma","ba","lit","ex","e.g","i.e","circa","ca","cca","v.s","etc","esp","ft","b.c","a.d"],A=["co","corp","yahoo","joomla","jeopardy","dept","univ","assn","bros","inc","ltd"],B=["ala","ariz","ark","cal","calif","col","colo","conn","del","fed","fla","fl","ga","ida","ind","ia","la","kan","kans","ken","ky","la","md","mich","minn","mont","neb","nebr","nev","okla","penna","penn","pa","dak","tenn","tex","ut","vt","va","wash","wis","wisc","wy","wyo","usafa","alta","ont","que","sask","yuk","ave","blvd","cl","ct","cres","hwy","U.S","U.S.A","E.U","N\xB0"],z=["a.m","p.m"],$=["jan","feb","mar","apr","jun","jul","aug","sep","oct","nov","dec","sept","sep"],d=["ex","e.g","i.e","circa","ca","cca","v.s","esp","ft","st","mt",...b],w=[...y,...$,...A,...B,...z,...b];function u(e){if(e.length===0)return[];let n=e.replace(/^\"/," `` ").replace(/([ (\[{<])"/g,"$1 `` ").replace(/\.\.\.*/g," ... ").replace(/[;@#$%&]/g," $& ").replace(/([^\.])(\.)([\]\)}>"\']*)\s*$/g,"$1 $2$3 ").replace(/[,?!]/g," $& ").replace(/[\]\[\(\)\{\}<>]/g," $& ").replace(/---*/g," -- ");n=` ${n} `,n=n.replace(/"/g," '' ").replace(/([^'])' /g,"$1 ' ").replace(/'([sSmMdD]) /g," '$1 ").replace(/('ll|'LL|'re|'RE|'ve|'VE|n't|N'T) /g," $1 ");let i=-1;for(;i++<m.length;)n=n.replace(m[i]," $1 $2 ");return n=n.replace(/\ \ +/g," ").replace(/^\ |\ $/g,""),n.split(" ")}function x(e){if(e.length===0)return[];let n=new RegExp("\\b("+w.join("|")+")[.!?] ?$","i"),i=new RegExp(/[ |.][A-Z].?$/,"i"),s=new RegExp(/[\r\n]+/,"g"),o=new RegExp(/\.\.\.*$/),a=new RegExp("\\b("+d.join("|")+")[.!?] ?$","i"),t=e.split(/(\S.+?[.?!])(?=\s+|$|")/g),c=[];for(let r=0;r<t.length;r++)if(t[r])if(t[r]=t[r].replace(/(^ +| +$)/g,""),s.test(t[r]))t[r+1]&&p(t[r])?t[r+1]=(t[r].trim()||"")+" "+(t[r+1]||"").replace(/ +/g," "):c.push(...t[r].trim().split(`
`));else if(t[r+1]&&n.test(t[r])){let l=t[r+1];l.trim()&&p(l)&&!a.test(t[r])?(c.push(t[r]),t[r]=""):t[r+1]=(t[r]||"")+" "+(l||"").replace(/ +/g," ")}else if(t[r].length>1&&t[r+1]&&i.test(t[r])){let l=t[r].split(" "),g=l[l.length-1];g===g.toLowerCase()?t[r+1]=t[r+1]=(t[r]||"")+" "+(t[r+1]||"").replace(/ +/g," "):t[r+2]&&(p(l[l.length-2])&&p(t[r+2])?t[r+2]=(t[r]||"")+(t[r+1]||"").replace(/ +/g," ")+(t[r+2]||""):(c.push(t[r]),t[r]=""))}else t[r+1]&&o.test(t[r])?t[r+1]=(t[r]||"")+(t[r+1]||"").replace(/ +/g," "):t[r]&&t[r].length>0&&(c.push(t[r]),t[r]="");return c.length===0?[e]:c}function p(e){let n=e.trim().slice(0,1);return C(n)}function C(e){if(e.length!==1)throw new RangeError("Input should be a single character");let n=e.charCodeAt(0);return n>=65&&n<=90}function N(e,n=Map){return(()=>{let i=new n;return s=>{if(i.has(s))return i.get(s);{let o=e(s);return i.set(s,o),o}}})()}function R(e,n=1){if(e<0)throw RangeError("Input must be a positive number");return e<2?n:R(e-1,e*n)}var L=N(R);function E(e){if(e.length<2)throw new RangeError("Input must have at least two words");let n=[];for(let i=0;i<e.length-1;i++)for(let s=i+1;s<e.length;s++)n.push(`${e[i]} ${e[s]}`);return n}var j={start:!1,end:!1,val:"<S>"};function k(e,n=2,i={}){if(n<1)throw new RangeError("ngram size cannot be smaller than 1");if(e.length<n)throw new RangeError("ngram size cannot be larger than the number of tokens available");if(Object.keys(i).length!==0){let o=Object.assign({},j,i),a=e.slice(0);if(o.start)for(let t=0;t<n-1;t++)a.unshift(o.val);if(o.end)for(let t=0;t<n-1;t++)a.push(o.val);e=a}let s=[];for(let o=0;o<e.length-n+1;o++)s.push(e.slice(o,o+n).join(" "));return s}function D(e){if(e<2)throw new RangeError("Input must be greater than 2");return .5*e*(e-1)}function G(e){if(e.length<1)throw new RangeError("Input array must have at least 1 element");return e.reduce((n,i)=>n+i)/e.length}function K(e,n,i,s=G){if(e.length<2)throw new RangeError("Candidate array must contain more than one element");let o=e.map(t=>i(t,n)),a=[];for(let t=0;t<o.length;t++){let c=o.slice(0);c.splice(t,1),a.push(Math.max(...c))}return s(a)}function h(e,n,i=.5){if(e<0||e>1)throw new RangeError("Precision value p must have bounds 0 \u2264 p \u2264 1");if(n<0||n>1)throw new RangeError("Recall value r must have bounds 0 \u2264 r \u2264 1");if(i<0)throw new RangeError("beta value must be greater than 0");return 0<=i&&i<=1?(1+i*i)*n*e/(n+i*i*e):n}function f(e,n){let i=new Set(e),s=new Set(n);return Array.from(i).filter(o=>s.has(o))}function T(e,n){if(e.length===0||n.length===0)return[];let i=[],s=[],o=0,a=e.length-1,t=n.length-1;for(;e[o]&&n[o]&&e[o]===n[o];)i.push(e[o]),o++;for(;e[a]&&n[t]&&e[a]===n[t];)s.push(e[a]),a--,t--;let c=e.slice(o,a+1),r=n.slice(o,t+1);for(let l=0;l<r.length;l++)for(let g=0;g<c.length;g++)r[l]===c[g]&&i.push(c[g]);return i.concat(s)}function W(e,n,i={}){if(e.length===0)throw new RangeError("Candidate cannot be an empty string");if(n.length===0)throw new RangeError("Reference cannot be an empty string");let s=Object.assign({n:1,nGram:k,tokenizer:u},i),o=s.nGram(s.tokenizer(e),s.n),a=s.nGram(s.tokenizer(n),s.n);return f(o,a).length/a.length}function q(e,n,i={}){if(e.length===0)throw new RangeError("Candidate cannot be an empty string");if(n.length===0)throw new RangeError("Reference cannot be an empty string");let s=Object.assign({beta:.5,skipBigram:E,tokenizer:u},i),o=s.skipBigram(s.tokenizer(e)),a=s.skipBigram(s.tokenizer(n)),t=f(o,a).length;if(t===0)return 0;{let c=t/a.length,r=t/o.length;return h(r,c,s.beta)}}function F(e,n,i={}){if(e.length===0)throw new RangeError("Candidate cannot be an empty string");if(n.length===0)throw new RangeError("Reference cannot be an empty string");let s=Object.assign({beta:.5,lcs:T,segmenter:x,tokenizer:u},i),o=s.segmenter(e),a=s.segmenter(n),t=s.tokenizer(e),c=s.tokenizer(n),r=a.map(S=>{let v=s.tokenizer(S);return new Set(...o.map(I=>s.lcs(s.tokenizer(I),v))).size}),l=0;for(;r.length;)l+=r.pop();let g=l/t.length,O=l/c.length;return h(O,g,s.beta)}export{j as NGRAM_DEFAULT_OPTS,G as arithmeticMean,C as charIsUpperCase,D as comb2,h as fMeasure,L as fact,f as intersection,K as jackKnife,F as l,T as lcs,W as n,k as nGram,q as s,x as sentenceSegment,E as skipBigram,p as strIsTitleCase,u as treeBankTokenize};
/**
* @license
* @Author: Lim Mingjie, Kenneth
* @Date:   2016-01-20T18:56:22-05:00
* @Email:  me@kenlimmj.com
* @Last modified by:   Astrianna
* @Last modified time: 2016-02-27T21:34:23-05:00
*/
/**
* @license
* @Author: Lim Mingjie, Kenneth
* @Date:   2016-01-20T18:56:14-05:00
* @Email:  me@kenlimmj.com
* @Last modified by:   Astrianna
* @Last modified time: 2016-02-27T19:50:25-05:00
*/
//# sourceMappingURL=rouge.js.map
