import {DEMO_CATALOG_PRODUCTS,mapDemoCatalogProduct} from '@/components/catalog/catalog-detail-demo';
import {PRODUCTS} from '@/components/shell/demo-data';
const imageNames={Flower:'flower',Edible:'edible',Vape:'vape','Pre-roll':'preroll',Tincture:'tincture',Topical:'topical'};
const additions=[
 ['Peach Orchard Chew','Edible','Published',24,'$6.25','10-pack'],
 ['Cosmic Cherry Chews','Edible','Published',18,'$5.50','10-pack'],
 ['Sunset Citrus Bites','Edible','Unpublished',3,'$4.00','5-pack'],
 ['Electric Watermelon','Edible','Draft',0,'$6.00','10-pack'],
 ['Vape · Harbor Fog','Vape','Published',14,'$38.00','1g'],
 ['Flower · Sunrise Haze','Flower','Unpublished',4,'$40.00','3.5g'],
 ['Pre-roll · Stone Mountain','Pre-roll','Published',20,'$14.00','2-pack'],
 ['Tincture · Georgia Gold','Tincture','Published',16,'$45.00','30ml'],
 ['Topical · Rest Balm','Topical','Unpublished',0,'$28.00','50ml'],
];
const extra=additions.map(([name,category,publication,quantity,price,pack])=>{
 const base=PRODUCTS.find(p=>p.category===category)!;
 return mapDemoCatalogProduct({...base,name,description:`${name}, packaged as a ${pack}. Sample catalog product.`,variants:[pack],listing:{...base.listing,publication,price},inventorySummary:`On-hand ${quantity} · Sales floor`});
});
export const SAMPLE_PRODUCTS=[...DEMO_CATALOG_PRODUCTS,...extra].map(p=>({...p,
 storeName:'The Corner Store',
 primaryImageAlt:`${p.name} sample packaging`,
 summary:{...p.summary,image:'photo',imageUrl:'/assets/img/folio/project--green-loom/products/responsive/'+imageNames[p.summary.category]+'.png-240.webp'}
}));
