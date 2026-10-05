import React,{useState,useRef,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {CatalogPanel} from '@/components/catalog/catalog-panel';
import {CatalogDetailMain} from '@/components/catalog/catalog-detail';
import {SAMPLE_PRODUCTS} from './sample-products';
import {Button} from '@/components/ui/button';
import {ArrowLeft,Cat,RotateCcw} from 'lucide-react';
import '@/components/catalog/catalog-tab-slide.css';
function Demo(){
 const [products,setProducts]=useState(()=>structuredClone(SAMPLE_PRODUCTS));
 const [activeTab,setActiveTab]=useState('product'); const [segment,setSegment]=useState('published'); const [search,setSearch]=useState(''); const [selected,setSelected]=useState(null); const [message,setMessage]=useState('');
 const detailPane=useRef(null);
 // The upstream dialog is controlled rather than paired with a DialogTrigger.
 // Restore its launch control after cancellation or the stock-save remount.
 useEffect(()=>{
  let launcher=null;let wasOpen=false;let timer;
  const remember=e=>{const button=e.target.closest?.('button');if(button&&!button.closest('[role="dialog"]')&&button.textContent.trim()==='Adjust stock')launcher=button;};
  const observer=new MutationObserver(()=>{
   const open=Boolean(document.querySelector('[role="dialog"]'));
   if(wasOpen&&!open)timer=setTimeout(()=>{
    const target=launcher?.isConnected?launcher:Array.from(document.querySelectorAll('.demo-detail button')).find(b=>b.textContent.trim()==='Adjust stock');
    target?.focus();
   },0);
   wasOpen=open;
  });
  document.addEventListener('click',remember,true);document.addEventListener('focusin',remember,true);
  observer.observe(document.body,{childList:true,subtree:true});
  return()=>{clearTimeout(timer);observer.disconnect();document.removeEventListener('click',remember,true);document.removeEventListener('focusin',remember,true);};
 },[]);
 useEffect(()=>{detailPane.current?.scrollTo({top:0});},[selected,activeTab]);
 const detail=products.find(p=>p.id===selected);
 const items=products.filter(p=>p.summary.publicationSegment===segment&&p.name.toLowerCase().includes(search.toLowerCase()));
 function update(fn,text){setProducts(ps=>ps.map(p=>p.id===selected?fn(p):p));setMessage(text)}
 return <main className="demo"><header className="demo-nav"><Cat size={22}/><strong>Catalog</strong><span>The Corner Store</span><Button variant="ghost" aria-label="Reset prototype" onClick={()=>{setProducts(structuredClone(SAMPLE_PRODUCTS));setSelected(null);setSearch('');setSegment('published');setMessage('Prototype reset.')}}><RotateCcw size={16}/></Button></header>
 <div className={'demo-workspace '+(detail?'has-detail':'')}><section className="demo-list"><div className="demo-store"><strong>The Corner Store</strong><span>Sample store · Catalog</span></div><div className="demo-collection"><CatalogPanel key={segment} state={items.length?'populated':'filtered-empty'} items={items} selectedId={selected} publicationSegment={segment} onPublicationSegmentChange={v=>{setSegment(v);setSelected(null)}} searchValue={search} onSearchChange={setSearch} onSelect={id=>{setSelected(id);setActiveTab('product');setMessage('')}} onClearFilters={()=>setSearch('')} canAddProduct={false} productHref={id=>'#'+id}/></div></section>
 <section ref={detailPane} className="demo-detail" aria-label="Product details">{detail?<><Button className="demo-back" variant="ghost" onClick={()=>setSelected(null)}><ArrowLeft size={16}/>Back to catalog</Button><CatalogDetailMain key={detail.id+':'+detail.inventoryRecord?.onHand} detail={detail} activeTab={activeTab} onActiveTabChange={setActiveTab} canManageVariant={false} canAddVariant={false} canManageListing={false} canAdjustStock={true} onAdjustStock={async ({delta})=>{if(!detail.inventoryRecord)throw Error('No inventory record');const onHand=detail.inventoryRecord.onHand+delta;if(onHand<detail.inventoryRecord.reserved)throw Error('Quantity cannot be lower than reserved stock.');update(p=>({...p,summary:{...p.summary,onHand},inventoryRecord:{...p.inventoryRecord,onHand,available:onHand-p.inventoryRecord.reserved}}),'Stock updated. Product identity and lab evidence are unchanged.')}}/></>:<div className="demo-empty"><Cat size={32}/><h1>Select a product</h1><p>Choose an item from the catalog to view its details.</p></div>}<p className="demo-message" role="status">{message}</p></section></div></main>
}
createRoot(document.getElementById('root')).render(<Demo/>);