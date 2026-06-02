'use client';

import { useEffect, useRef } from 'react';

export default function WapbizWidget() {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Original Wapbiz script - COMPLETE VERSION
    const scriptCode = `(function(){
  var e=document.createElement("link");
  e.href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
  e.rel="stylesheet",
  document.head.appendChild(e);
  
  var t=document.createElement("style");
  t.innerHTML="\\n            body, button, div { font-family: 'Poppins', sans-serif; }\\n            #wapbiz-btn { position: fixed; z-index: 9999; display:flex; align-items:center; }\\n            #wapbiz-widget{ position: fixed; z-index: 9998; width: 380px; max-width: calc(100vw - 24px); background: #FFFFFF; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.15); display: none; flex-direction: column; justify-content: space-between; overflow: hidden; }\\n            @media (max-width: 480px) { #wapbiz-widget{ width: calc(100vw - 16px); left: 8px !important; right: 8px !important; bottom: 80px !important; top: auto !important; border-radius: 14px; } }",
  document.head.appendChild(t);
  
  var n="bottom-right",
      l="#4DC247",
      i="Tailio",
      p=!1,
      o=document.createElement("button");
  o.id="wapbiz-btn",
  o.style.position="fixed",
  o.style.zIndex="9999",
  o.style.backgroundColor=l,
  o.style.color="#FFFFFF",
  o.style.border="none",
  o.style.padding="8px 16px",
  o.style.borderRadius="25px",
  o.style.cursor="pointer",
  o.style.display="flex",
  o.style.alignItems="center",
  o.style.bottom="20px",
  o.style.right="20px";
  
  var d=document.createElement("img");
  d.src="https://img.icons8.com/?size=100&id=QkXeKixybtww&format=png&color=000000",
  d.alt="WhatsApp Icon",
  d.style.width="35px",
  d.style.height="35px";
  
  var s=document.createElement("span");
  s.innerText="Chat with us",
  s.style.marginLeft="10px",
  s.style.fontWeight="500",
  s.style.fontSize="14px",
  o.appendChild(d),
  o.appendChild(s);
  
  var a=document.createElement("div");
  a.id="wapbiz-widget",
  a.style.position="fixed",
  a.style.zIndex="9998",
  a.style.backgroundColor="#FFFFFF",
  a.style.borderRadius="10px",
  a.style.boxShadow="0 2px 4px rgba(0,0,0,0.15)",
  a.style.display="none",
  a.style.flexDirection="column",
  a.style.justifyContent="space-between",
  a.style.bottom="100px",
  a.style.right="20px";
  
  var r=document.createElement("div");
  r.style.backgroundColor="#ee9b0f",
  r.style.color="#FFFFFF",
  r.style.padding="15px",
  r.style.borderTopLeftRadius="10px",
  r.style.borderTopRightRadius="10px",
  r.style.display="flex",
  r.style.alignItems="center",
  r.style.justifyContent="space-between";
  
  var y=document.createElement("div");
  y.style.display="flex",
  y.style.alignItems="center";
  
  var c=document.createElement("img");
  c.src="https://api.wapp.biz/uploads/file-1174707529053375.jpg",
  c.alt="Profile Avatar",
  c.style.width="40px",
  c.style.height="40px",
  c.style.borderRadius="50%",
  c.style.objectFit="cover",
  c.style.marginRight="10px";
  
  var x=document.createElement("div");
  x.style.display="flex",
  x.style.flexDirection="column",
  x.style.justifyContent="center";
  
  var m=document.createElement("div");
  m.innerText=i,
  m.style.fontSize="16px",
  m.style.fontWeight="500",
  m.style.color="#FFFFFF";
  
  var h=document.createElement("div");
  h.innerText="online",
  h.style.fontSize="12px",
  h.style.color="#C1C1C1",
  x.appendChild(m),
  x.appendChild(h),
  y.appendChild(c),
  y.appendChild(x);
  
  var u=document.createElement("div");
  u.style.marginLeft="auto";
  
  var f=document.createElement("button");
  f.style.color="#FFFFFF",
  f.style.background="transparent",
  f.style.border="none",
  f.style.cursor="pointer",
  f.style.fontSize="24px",
  f.innerHTML="&times;",
  f.onclick=function(){ a.style.display="none", p=!1, o.innerHTML="", o.appendChild(d), o.appendChild(s), o.style.padding="8px 16px" },
  u.appendChild(f),
  r.appendChild(y),
  r.appendChild(u),
  a.appendChild(r);
  
  var b=document.createElement("div");
  b.style.height="140px",
  b.style.paddingLeft="15px",
  b.style.paddingTop="15px",
  b.style.backgroundColor="#E5DDD5",
  b.style.display="flex",
  b.style.alignItems="flex-start",
  b.style.justifyContent="flex-start";
  
  var g=document.createElement("div");
  g.style.width="80%",
  g.style.backgroundColor="#FFFFFF",
  g.style.padding="10px",
  g.style.borderRadius="10px",
  g.style.boxShadow="0 2px 4px rgba(0,0,0,0.05)";
  
  var F=document.createElement("div");
  F.innerText=i,
  F.style.fontSize="15px",
  F.style.fontWeight="500",
  F.style.color="#828886";
  
  var C=document.createElement("div");
  C.innerText="Hi, how can I help you?",
  C.style.fontSize="14px",
  g.appendChild(F),
  g.appendChild(C),
  b.appendChild(g),
  a.appendChild(b);
  
  var v=document.createElement("div");
  v.style.display="flex",
  v.style.justifyContent="center",
  v.style.padding="20px 20px 10px 20px";
  
  var w=document.createElement("button");
  w.style.width="90%",
  w.style.height="35px",
  w.style.backgroundColor=l,
  w.style.borderRadius="30px",
  w.style.color="#FFFFFF",
  w.style.fontSize="15px",
  w.style.fontWeight="500",
  w.style.cursor="pointer",
  w.style.border="none",
  w.innerText="Start chat",
  w.onclick=function(){ window.open("https://app.wapp.biz/sr/6a1de58e49df8d2fd4890c26","_blank") },
  v.appendChild(w),
  a.appendChild(v);
  
  var E=document.createElement("div");
  E.style.textAlign="center",
  E.style.fontSize="12px",
  E.style.fontFamily="Poppins, sans-serif",
  E.style.color="#666",
  E.style.paddingBottom="8px",
  E.innerHTML='Powered by <a href="https://wapbiz.com/" style="color: #4DC247; text-decoration: none;">Wapbiz</a>',
  a.appendChild(E);
  
  o.onclick=function(){ p=!p, a.style.display=p?"flex":"none" };
  
  document.body.appendChild(o),
  document.body.appendChild(a);
})()`;
    
    const script = document.createElement('script');
    script.textContent = scriptCode;
    document.body.appendChild(script);
    scriptRef.current = script;

    // Cleanup function
    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
      
      const button = document.getElementById('wapbiz-btn');
      const widget = document.getElementById('wapbiz-widget');
      
      if (button && document.body.contains(button)) {
        document.body.removeChild(button);
      }
      
      if (widget && document.body.contains(widget)) {
        document.body.removeChild(widget);
      }
    };
  }, []);

  return null;
}