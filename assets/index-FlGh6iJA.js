var Hu=Object.defineProperty;var Vu=(i,e,t)=>e in i?Hu(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Ie=(i,e,t)=>Vu(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();function ji(i){return`./${i.replace(/^\//,"")}`}const Hs=[{id:"skull",label:"Skull"},{id:"spine",label:"Spine"},{id:"thorax",label:"Thorax"},{id:"upper",label:"Upper limb"},{id:"lower",label:"Lower limb"},{id:"pelvis",label:"Pelvis"}],Oh=[{id:"vertebrae",label:"Vertebrae"},{id:"ribs_sternum",label:"Ribs / sternum"},{id:"cranial",label:"Skull bones"},{id:"long",label:"Long bones"},{id:"flat",label:"Flat bones"},{id:"short",label:"Short bones"},{id:"sesamoid",label:"Sesamoid"},{id:"irregular",label:"Irregular"}],Gu=[{id:"all",label:"All"},{id:"upper",label:"Upper limb"},{id:"lower",label:"Lower limb"},{id:"axial",label:"Axial"},{id:"hand_wrist",label:"Hand & wrist"},{id:"foot_ankle",label:"Foot & ankle"},{id:"spine_ribs",label:"Spine & ribs"}];ji("models/extra");const At=[{id:"c1",part:"vertebrae",region:"spine",meshNames:["vertebra_c1"],displayName:"C1",aliases:["c1","c 1","atlas","cervical 1","1st cervical","first cervical"],hint:"atlas · first cervical vertebra"},{id:"c2",part:"vertebrae",region:"spine",meshNames:["vertebra_c2"],displayName:"C2",aliases:["c2","c 2","axis","cervical 2","2nd cervical","second cervical"],hint:"axis · second cervical vertebra"},{id:"c3",part:"vertebrae",region:"spine",meshNames:["vertebra_c3"],displayName:"C3",aliases:["c3","c 3","cervical 3","3rd cervical","third cervical","cervical vertebra 3"],hint:"third cervical vertebra"},{id:"c4",part:"vertebrae",region:"spine",meshNames:["vertebra_c4"],displayName:"C4",aliases:["c4","c 4","cervical 4","4th cervical","fourth cervical","cervical vertebra 4"],hint:"fourth cervical vertebra"},{id:"c5",part:"vertebrae",region:"spine",meshNames:["vertebra_c5"],displayName:"C5",aliases:["c5","c 5","cervical 5","5th cervical","fifth cervical","cervical vertebra 5"],hint:"fifth cervical vertebra"},{id:"c6",part:"vertebrae",region:"spine",meshNames:["vertebra_c6"],displayName:"C6",aliases:["c6","c 6","cervical 6","6th cervical","sixth cervical","cervical vertebra 6"],hint:"sixth cervical vertebra"},{id:"c7",part:"vertebrae",region:"spine",meshNames:["vertebra_c7"],displayName:"C7",aliases:["c7","c 7","cervical 7","7th cervical","seventh cervical","vertebra prominens"],hint:"vertebra prominens · seventh cervical"},...["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12"].map((i,e)=>{const t=e+1,n=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth"];return{id:i,region:"spine",part:"vertebrae",meshNames:[`vertebra_${i}`],displayName:i.toUpperCase(),aliases:[i,`t ${t}`,`thoracic ${t}`,`${t}th thoracic`,`${n[e]} thoracic`,`thoracic vertebra ${t}`,`${t}st thoracic`,`${t}nd thoracic`,`${t}rd thoracic`].filter(Boolean),hint:`${n[e]} thoracic vertebra`}}),{id:"l1",part:"vertebrae",region:"spine",meshNames:["vertebra_l1"],displayName:"L1",aliases:["l1","l 1","lumbar 1","1st lumbar","first lumbar","lumbar vertebra 1"],hint:"first lumbar vertebra"},{id:"l2",part:"vertebrae",region:"spine",meshNames:["vertebra_l2"],displayName:"L2",aliases:["l2","l 2","lumbar 2","2nd lumbar","second lumbar","lumbar vertebra 2"],hint:"second lumbar vertebra"},{id:"l3",part:"vertebrae",region:"spine",meshNames:["vertebra_l3"],displayName:"L3",aliases:["l3","l 3","lumbar 3","3rd lumbar","third lumbar","lumbar vertebra 3"],hint:"third lumbar vertebra"},{id:"l4",part:"vertebrae",region:"spine",meshNames:["vertebra_l4"],displayName:"L4",aliases:["l4","l 4","lumbar 4","4th lumbar","fourth lumbar","lumbar vertebra 4"],hint:"fourth lumbar vertebra"},{id:"l5",part:"vertebrae",region:"spine",meshNames:["vertebra_l5"],displayName:"L5",aliases:["l5","l 5","lumbar 5","5th lumbar","fifth lumbar","lumbar vertebra 5"],hint:"fifth lumbar vertebra"},{id:"sacrum",part:"irregular",region:"pelvis",meshNames:["sacrum"],displayName:"sacrum",aliases:["sacrum","sacral bone","os sacrum"],hint:"os sacrum · sacred bone"},{id:"manubrium",part:"ribs_sternum",region:"thorax",meshNames:["sternum_manubrium"],displayName:"manubrium",aliases:["manubrium","manubrium of sternum","sternal manubrium","handle of sternum"],hint:"manubrium sterni · handle (Latin manubrium)"},{id:"sternum_body",part:"ribs_sternum",region:"thorax",meshNames:["sternum_body"],displayName:"body of sternum",aliases:["body of sternum","sternal body","sternum body","gladiolus","corpus sterni","sternum"],hint:"corpus sterni · gladiolus (sword blade)"},{id:"xiphoid",part:"ribs_sternum",region:"thorax",meshNames:["sternum_xiphoid"],displayName:"xiphoid process",aliases:["xiphoid","xiphoid process","xiphisternum","ensiform process"],hint:"xiphoid · sword-shaped (Greek xiphos)"},{id:"rib1",part:"ribs_sternum",region:"thorax",meshNames:["rib_l1","rib_r1"],displayName:"1st rib",aliases:["1st rib","first rib","rib 1","rib1","1 rib"],hint:"costa I · atypical short broad rib"},{id:"rib2",part:"ribs_sternum",region:"thorax",meshNames:["rib_l2","rib_r2"],displayName:"2nd rib",aliases:["2nd rib","second rib","rib 2","rib2","2 rib"],hint:"costa II · atypical, thinner than 1st"},{id:"rib3",part:"ribs_sternum",region:"thorax",meshNames:["rib_l3","rib_r3"],displayName:"3rd rib",aliases:["3rd rib","third rib","rib 3","rib3","3 rib"],hint:"costa III · typical true rib"},{id:"rib4",part:"ribs_sternum",region:"thorax",meshNames:["rib_l4","rib_r4"],displayName:"4th rib",aliases:["4th rib","fourth rib","rib 4","rib4","4 rib"],hint:"costa IV · typical true rib"},{id:"rib5",part:"ribs_sternum",region:"thorax",meshNames:["rib_l5","rib_r5"],displayName:"5th rib",aliases:["5th rib","fifth rib","rib 5","rib5","5 rib"],hint:"costa V · typical true rib"},{id:"rib6",part:"ribs_sternum",region:"thorax",meshNames:["rib_l6","rib_r6"],displayName:"6th rib",aliases:["6th rib","sixth rib","rib 6","rib6","6 rib"],hint:"costa VI · typical true rib"},{id:"rib7",part:"ribs_sternum",region:"thorax",meshNames:["rib_l7","rib_r7"],displayName:"7th rib",aliases:["7th rib","seventh rib","rib 7","rib7","7 rib"],hint:"costa VII · last true rib"},{id:"rib8",part:"ribs_sternum",region:"thorax",meshNames:["rib_l8","rib_r8"],displayName:"8th rib",aliases:["8th rib","eighth rib","rib 8","rib8","8 rib"],hint:"costa VIII · first false rib"},{id:"rib9",part:"ribs_sternum",region:"thorax",meshNames:["rib_l9","rib_r9"],displayName:"9th rib",aliases:["9th rib","ninth rib","rib 9","rib9","9 rib"],hint:"costa IX · false rib"},{id:"rib10",part:"ribs_sternum",region:"thorax",meshNames:["rib_l10","rib_r10"],displayName:"10th rib",aliases:["10th rib","tenth rib","rib 10","rib10","10 rib"],hint:"costa X · false rib"},{id:"rib11",part:"ribs_sternum",region:"thorax",meshNames:["rib_l11","rib_r11"],displayName:"11th rib",aliases:["11th rib","eleventh rib","rib 11","rib11","11 rib","floating rib"],hint:"costa XI · floating rib"},{id:"rib12",part:"ribs_sternum",region:"thorax",meshNames:["rib_l12","rib_r12"],displayName:"12th rib",aliases:["12th rib","twelfth rib","rib 12","rib12","12 rib","floating rib"],hint:"costa XII · floating rib"},{id:"frontal",part:"cranial",region:"skull",meshNames:["frontal"],displayName:"frontal bone",aliases:["frontal","frontal bone","os frontale"],hint:"os frontale · forehead bone"},{id:"parietal",part:"cranial",region:"skull",meshNames:["parietal_l","parietal_r"],displayName:"parietal bone",aliases:["parietal","parietal bone","os parietale"],hint:"os parietale · wall of the skull"},{id:"temporal",part:"cranial",region:"skull",meshNames:["temporal_l","temporal_r"],displayName:"temporal bone",aliases:["temporal","temporal bone","os temporale"],hint:"os temporale · temple bone"},{id:"occipital",part:"cranial",region:"skull",meshNames:["occipital"],displayName:"occipital bone",aliases:["occipital","occipital bone","os occipitale"],hint:"os occipitale · back of the head"},{id:"mandible",part:"cranial",region:"skull",meshNames:["mandible"],displayName:"mandible",aliases:["mandible","jaw","jawbone","lower jaw","mandibular bone"],hint:"mandible · lower jaw"},{id:"maxilla",part:"cranial",region:"skull",meshNames:["maxilla_l","maxilla_r"],displayName:"maxilla",aliases:["maxilla","upper jaw","maxillary bone"],hint:"maxilla · upper jaw"},{id:"zygomatic",part:"cranial",region:"skull",meshNames:["zygomatic_l","zygomatic_r"],displayName:"zygomatic bone",aliases:["zygomatic","zygomatic bone","cheekbone","cheek bone","malar bone"],hint:"zygoma · cheekbone"},{id:"clavicle",part:"long",region:"upper",meshNames:["clavicle_l","clavicle_r"],displayName:"clavicle",aliases:["clavicle","collarbone","collar bone"],hint:"clavicle · little key (Latin clavicula)"},{id:"scapula",part:"flat",region:"upper",meshNames:["scapula_l","scapula_r"],displayName:"scapula",aliases:["scapula","shoulder blade","shoulderblade"],hint:"scapula · shoulder blade"},{id:"humerus",part:"long",region:"upper",meshNames:["humerus_l","humerus_r"],displayName:"humerus",aliases:["humerus","upper arm bone"],hint:"humerus · upper arm bone"},{id:"radius",part:"long",region:"upper",meshNames:["radius_l","radius_r"],displayName:"radius",aliases:["radius","radial bone"],hint:"radius · lateral forearm bone"},{id:"ulna",part:"long",region:"upper",meshNames:["ulna_l","ulna_r"],displayName:"ulna",aliases:["ulna","ulnar bone"],hint:"ulna · medial forearm bone"},{id:"hip",part:"flat",region:"pelvis",meshNames:["hip_l","hip_r"],displayName:"hip bone",aliases:["hip bone","hipbone","os coxae","coxal bone","innominate bone","ilium","pelvic bone"],hint:"os coxae · hip bone (ilium + ischium + pubis fused)"},{id:"femur",part:"long",region:"lower",meshNames:["femur_l","femur_r"],displayName:"femur",aliases:["femur","thigh bone","thighbone"],hint:"femur · thigh bone"},{id:"patella",part:"sesamoid",region:"lower",meshNames:["patella_l","patella_r"],displayName:"patella",aliases:["patella","kneecap","knee cap"],hint:"patella · kneecap (sesamoid)"},{id:"tibia",part:"long",region:"lower",meshNames:["tibia_l","tibia_r"],displayName:"tibia",aliases:["tibia","shinbone","shin bone"],hint:"tibia · shinbone"},{id:"fibula",part:"long",region:"lower",meshNames:["fibula_l","fibula_r"],displayName:"fibula",aliases:["fibula","calf bone"],hint:"fibula · calf bone (Latin clasp)"},{id:"scaphoid",part:"short",region:"upper",meshNames:["scaphoid_l","scaphoid_r"],displayName:"scaphoid",aliases:["scaphoid","scaphoid bone","navicular of hand"],hint:"scaphoid · boat-shaped carpal (most fractured)",tags:["hand_wrist"]},{id:"lunate",part:"short",region:"upper",meshNames:["lunate_l","lunate_r"],displayName:"lunate",aliases:["lunate","lunate bone","semilunar"],hint:"lunate · moon-shaped carpal",tags:["hand_wrist"]},{id:"triquetrum",part:"short",region:"upper",meshNames:["triquetrum_l","triquetrum_r"],displayName:"triquetrum",aliases:["triquetrum","triquetral","triquetral bone","triangular bone"],hint:"triquetrum · three-cornered carpal",tags:["hand_wrist"]},{id:"pisiform",part:"short",region:"upper",meshNames:["pisiform_l","pisiform_r"],displayName:"pisiform",aliases:["pisiform","pisiform bone"],hint:"pisiform · pea-shaped carpal (sesamoid-like)",tags:["hand_wrist"]},{id:"trapezium",part:"short",region:"upper",meshNames:["trapezium_l","trapezium_r"],displayName:"trapezium",aliases:["trapezium","trapezium bone","greater multangular"],hint:"trapezium · under the thumb (1st CMC)",tags:["hand_wrist"]},{id:"trapezoid",part:"short",region:"upper",meshNames:["trapezoid_l","trapezoid_r"],displayName:"trapezoid",aliases:["trapezoid","trapezoid bone","lesser multangular"],hint:"trapezoid · under index metacarpal",tags:["hand_wrist"]},{id:"capitate",part:"short",region:"upper",meshNames:["capitate_l","capitate_r"],displayName:"capitate",aliases:["capitate","capitate bone","os magnum"],hint:"capitate · largest carpal (headed)",tags:["hand_wrist"]},{id:"hamate",part:"short",region:"upper",meshNames:["hamate_l","hamate_r"],displayName:"hamate",aliases:["hamate","hamate bone","unciform"],hint:"hamate · hooked carpal (hamulus)",tags:["hand_wrist"]},{id:"metacarpals",part:"long",region:"upper",meshNames:["metacarpal1_l","metacarpal1_r","metacarpal2_l","metacarpal2_r","metacarpal3_l","metacarpal3_r","metacarpal4_l","metacarpal4_r","metacarpal5_l","metacarpal5_r"],displayName:"metacarpals",aliases:["metacarpals","metacarpal bones","metacarpal","metacarpus"],hint:"metacarpals · five bones of the palm (I–V)",tags:["hand_wrist"]},{id:"metacarpal1",part:"long",region:"upper",meshNames:["metacarpal1_l","metacarpal1_r"],displayName:"1st metacarpal",aliases:["1st metacarpal","first metacarpal","metacarpal 1","metacarpal i","thumb metacarpal"],hint:"1st metacarpal · thumb metacarpal",tags:["hand_wrist"]},{id:"metacarpal2",part:"long",region:"upper",meshNames:["metacarpal2_l","metacarpal2_r"],displayName:"2nd metacarpal",aliases:["2nd metacarpal","second metacarpal","metacarpal 2","metacarpal ii","index metacarpal"],hint:"2nd metacarpal · index finger",tags:["hand_wrist"]},{id:"metacarpal3",part:"long",region:"upper",meshNames:["metacarpal3_l","metacarpal3_r"],displayName:"3rd metacarpal",aliases:["3rd metacarpal","third metacarpal","metacarpal 3","metacarpal iii"],hint:"3rd metacarpal · middle finger",tags:["hand_wrist"]},{id:"metacarpal4",part:"long",region:"upper",meshNames:["metacarpal4_l","metacarpal4_r"],displayName:"4th metacarpal",aliases:["4th metacarpal","fourth metacarpal","metacarpal 4","metacarpal iv"],hint:"4th metacarpal · ring finger",tags:["hand_wrist"]},{id:"metacarpal5",part:"long",region:"upper",meshNames:["metacarpal5_l","metacarpal5_r"],displayName:"5th metacarpal",aliases:["5th metacarpal","fifth metacarpal","metacarpal 5","metacarpal v"],hint:"5th metacarpal · little finger",tags:["hand_wrist"]},{id:"hand_phalanges",part:"long",region:"upper",meshNames:["phal_hand_prox_thumb_l","phal_hand_prox_index_l","phal_hand_prox_middle_l","phal_hand_prox_ring_l","phal_hand_prox_little_l","phal_hand_mid_index_l","phal_hand_mid_middle_l","phal_hand_mid_ring_l","phal_hand_mid_little_l","phal_hand_dist_thumb_l","phal_hand_dist_index_l","phal_hand_dist_middle_l","phal_hand_dist_ring_l","phal_hand_dist_little_l","phal_hand_prox_thumb_r","phal_hand_prox_index_r","phal_hand_prox_middle_r","phal_hand_prox_ring_r","phal_hand_prox_little_r","phal_hand_mid_index_r","phal_hand_mid_middle_r","phal_hand_mid_ring_r","phal_hand_mid_little_r","phal_hand_dist_thumb_r","phal_hand_dist_index_r","phal_hand_dist_middle_r","phal_hand_dist_ring_r","phal_hand_dist_little_r"],displayName:"hand phalanges",aliases:["hand phalanges","phalanges of hand","finger bones","phalanges","phalanx of finger","finger phalanges"],hint:"phalanges · proximal, middle, distal (thumb has two)",tags:["hand_wrist"]},{id:"calcaneus",part:"short",region:"lower",meshNames:["calcaneus_l","calcaneus_r"],displayName:"calcaneus",aliases:["calcaneus","calcaneum","heel bone","heelbone"],hint:"calcaneus · heel bone",tags:["foot_ankle"]},{id:"talus",part:"short",region:"lower",meshNames:["talus_l","talus_r"],displayName:"talus",aliases:["talus","astragalus","ankle bone"],hint:"talus · ankle bone (trochlea)",tags:["foot_ankle"]},{id:"navicular",part:"short",region:"lower",meshNames:["navicular_l","navicular_r"],displayName:"navicular",aliases:["navicular","navicular bone","navicular of foot"],hint:"navicular · boat-shaped tarsal",tags:["foot_ankle"]},{id:"cuboid",part:"short",region:"lower",meshNames:["cuboid_l","cuboid_r"],displayName:"cuboid",aliases:["cuboid","cuboid bone"],hint:"cuboid · lateral tarsal",tags:["foot_ankle"]},{id:"cuneiform_medial",part:"short",region:"lower",meshNames:["cuneiform_med_l","cuneiform_med_r"],displayName:"medial cuneiform",aliases:["medial cuneiform","first cuneiform","1st cuneiform","cuneiform medial"],hint:"medial cuneiform · under 1st metatarsal",tags:["foot_ankle"]},{id:"cuneiform_intermediate",part:"short",region:"lower",meshNames:["cuneiform_int_l","cuneiform_int_r"],displayName:"intermediate cuneiform",aliases:["intermediate cuneiform","middle cuneiform","second cuneiform","2nd cuneiform"],hint:"intermediate cuneiform · under 2nd metatarsal",tags:["foot_ankle"]},{id:"cuneiform_lateral",part:"short",region:"lower",meshNames:["cuneiform_lat_l","cuneiform_lat_r"],displayName:"lateral cuneiform",aliases:["lateral cuneiform","third cuneiform","3rd cuneiform"],hint:"lateral cuneiform · under 3rd metatarsal",tags:["foot_ankle"]},{id:"metatarsals",part:"long",region:"lower",meshNames:["metatarsal1_l","metatarsal1_r","metatarsal2_l","metatarsal2_r","metatarsal3_l","metatarsal3_r","metatarsal4_l","metatarsal4_r","metatarsal5_l","metatarsal5_r"],displayName:"metatarsals",aliases:["metatarsals","metatarsal bones","metatarsal","metatarsus"],hint:"metatarsals · five bones of the forefoot (I–V)",tags:["foot_ankle"]},{id:"metatarsal1",part:"long",region:"lower",meshNames:["metatarsal1_l","metatarsal1_r"],displayName:"1st metatarsal",aliases:["1st metatarsal","first metatarsal","metatarsal 1","metatarsal i"],hint:"1st metatarsal · great toe",tags:["foot_ankle"]},{id:"metatarsal2",part:"long",region:"lower",meshNames:["metatarsal2_l","metatarsal2_r"],displayName:"2nd metatarsal",aliases:["2nd metatarsal","second metatarsal","metatarsal 2","metatarsal ii"],hint:"2nd metatarsal · longest metatarsal",tags:["foot_ankle"]},{id:"metatarsal3",part:"long",region:"lower",meshNames:["metatarsal3_l","metatarsal3_r"],displayName:"3rd metatarsal",aliases:["3rd metatarsal","third metatarsal","metatarsal 3","metatarsal iii"],hint:"3rd metatarsal",tags:["foot_ankle"]},{id:"metatarsal4",part:"long",region:"lower",meshNames:["metatarsal4_l","metatarsal4_r"],displayName:"4th metatarsal",aliases:["4th metatarsal","fourth metatarsal","metatarsal 4","metatarsal iv"],hint:"4th metatarsal",tags:["foot_ankle"]},{id:"metatarsal5",part:"long",region:"lower",meshNames:["metatarsal5_l","metatarsal5_r"],displayName:"5th metatarsal",aliases:["5th metatarsal","fifth metatarsal","metatarsal 5","metatarsal v"],hint:"5th metatarsal · styloid base (common avulsion)",tags:["foot_ankle"]},{id:"foot_phalanges",part:"long",region:"lower",meshNames:["phal_foot_prox_1_l","phal_foot_prox_2_l","phal_foot_prox_3_l","phal_foot_prox_4_l","phal_foot_prox_5_l","phal_foot_mid_2_l","phal_foot_mid_3_l","phal_foot_mid_4_l","phal_foot_mid_5_l","phal_foot_dist_1_l","phal_foot_dist_2_l","phal_foot_dist_3_l","phal_foot_dist_4_l","phal_foot_dist_5_l","phal_foot_prox_1_r","phal_foot_prox_2_r","phal_foot_prox_3_r","phal_foot_prox_4_r","phal_foot_prox_5_r","phal_foot_mid_2_r","phal_foot_mid_3_r","phal_foot_mid_4_r","phal_foot_mid_5_r","phal_foot_dist_1_r","phal_foot_dist_2_r","phal_foot_dist_3_r","phal_foot_dist_4_r","phal_foot_dist_5_r"],displayName:"foot phalanges",aliases:["foot phalanges","phalanges of foot","toe bones","toe phalanges","phalanges of toes"],hint:"toe phalanges · proximal, middle, distal (hallux has two)",tags:["foot_ankle"]}];function Il(i){return i.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim()}function Wu(i,e){const t=Il(i);if(!t)return!1;const n=t.replace(/\s+/g,"");return e.aliases.some(s=>{const a=Il(s);return a===t||a.replace(/\s+/g,"")===n})}function Xu(i){const e=[...i];for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}function Ha(i,e){const t=new Set(i),n=new Set(e);return At.filter(s=>t.has(s.region)&&n.has(s.part))}function Wo(i){let e;switch(i){case"all":e=[...At];break;case"upper":e=At.filter(s=>s.region==="upper");break;case"lower":e=At.filter(s=>s.region==="lower");break;case"axial":e=At.filter(s=>s.region==="skull"||s.region==="spine"||s.region==="thorax");break;case"hand_wrist":e=At.filter(s=>{var a;return(a=s.tags)==null?void 0:a.includes("hand_wrist")});break;case"foot_ankle":e=At.filter(s=>{var a;return(a=s.tags)==null?void 0:a.includes("foot_ankle")});break;case"spine_ribs":e=At.filter(s=>s.region==="spine"||s.region==="thorax"||s.part==="vertebrae"||s.part==="ribs_sternum");break}e.length===0&&(e=[...At]);const t=new Set(e.map(s=>s.region)),n=new Set(e.map(s=>s.part));return{bones:e,regions:t,parts:n}}const ei=[{id:"neck_back",label:"Neck & back"},{id:"chest_abdomen",label:"Chest & abdomen"},{id:"shoulder_arm",label:"Shoulder & arm"},{id:"hip_thigh",label:"Hip & thigh"},{id:"lower_leg",label:"Lower leg"}],Ft=(i,e)=>e.map(t=>`${t}_${i}`),ti=[{id:"trapezius",region:"neck_back",meshNames:[...Ft("l",["trap_asc","trap_trans","trap_desc"]),...Ft("r",["trap_asc","trap_trans","trap_desc"])],displayName:"trapezius",aliases:["trapezius","traps","trapezius muscle"],hint:"trapezius · diamond-shaped upper back"},{id:"sternocleidomastoid",region:"neck_back",meshNames:["scm_l","scm_r"],displayName:"sternocleidomastoid",aliases:["sternocleidomastoid","scm","sternomastoid"],hint:"SCM · sternum + clavicle → mastoid"},{id:"deltoid",region:"shoulder_arm",meshNames:[...Ft("l",["delt_clav","delt_acro","delt_spin"]),...Ft("r",["delt_clav","delt_acro","delt_spin"])],displayName:"deltoid",aliases:["deltoid","deltoid muscle","delts"],hint:"deltoid · shoulder cap (clavicular, acromial, spinal)"},{id:"pectoralis_major",region:"chest_abdomen",meshNames:[...Ft("l",["pec_clav","pec_stern","pec_abd"]),...Ft("r",["pec_clav","pec_stern","pec_abd"])],displayName:"pectoralis major",aliases:["pectoralis major","pec major","pectoralis","pecs","pectoral"],hint:"pectoralis major · clavicular + sternocostal + abdominal"},{id:"external_oblique",region:"chest_abdomen",meshNames:["ext_oblique_l","ext_oblique_r"],displayName:"external oblique",aliases:["external oblique","external abdominal oblique","obliquus externus"],hint:"external oblique · hands-in-pockets fiber direction"},{id:"serratus_anterior",region:"chest_abdomen",meshNames:["serratus_ant_l","serratus_ant_r"],displayName:"serratus anterior",aliases:["serratus anterior","serratus anterior muscle","serratus"],hint:"serratus anterior · boxer's muscle, medial scapular border"},{id:"biceps_brachii",region:"shoulder_arm",meshNames:[...Ft("l",["biceps_long","biceps_short"]),...Ft("r",["biceps_long","biceps_short"])],displayName:"biceps brachii",aliases:["biceps brachii","biceps","biceps of arm"],hint:"biceps brachii · long + short heads"},{id:"triceps_brachii",region:"shoulder_arm",meshNames:[...Ft("l",["triceps_long","triceps_lat","triceps_med"]),...Ft("r",["triceps_long","triceps_lat","triceps_med"])],displayName:"triceps brachii",aliases:["triceps brachii","triceps","triceps of arm"],hint:"triceps brachii · long + lateral + medial heads"},{id:"gluteus_maximus",region:"hip_thigh",meshNames:["glut_max_l","glut_max_r"],displayName:"gluteus maximus",aliases:["gluteus maximus","glute max","glutes","gluteus maximus muscle"],hint:"gluteus maximus · primary hip extensor"},{id:"iliacus",region:"hip_thigh",meshNames:["iliacus_l","iliacus_r"],displayName:"iliacus",aliases:["iliacus","iliacus muscle"],hint:"iliacus · iliac fossa to lesser trochanter"},{id:"psoas_major",region:"hip_thigh",meshNames:["psoas_maj_l","psoas_maj_r"],displayName:"psoas major",aliases:["psoas major","psoas","psoas major muscle"],hint:"psoas major · lumbar spine to lesser trochanter"},{id:"rectus_femoris",region:"hip_thigh",meshNames:["rectus_fem_l","rectus_fem_r"],displayName:"rectus femoris",aliases:["rectus femoris","rectus femoris muscle"],hint:"rectus femoris · only quad that crosses the hip"},{id:"vastus_lateralis",region:"hip_thigh",meshNames:["vastus_lat_l","vastus_lat_r"],displayName:"vastus lateralis",aliases:["vastus lateralis","vastus lateralis muscle"],hint:"vastus lateralis · largest quadriceps muscle"},{id:"vastus_medialis",region:"hip_thigh",meshNames:["vastus_med_l","vastus_med_r"],displayName:"vastus medialis",aliases:["vastus medialis","vastus medialis muscle","vmo"],hint:"vastus medialis · teardrop on the medial knee"},{id:"vastus_intermedius",region:"hip_thigh",meshNames:["vastus_int_l","vastus_int_r"],displayName:"vastus intermedius",aliases:["vastus intermedius","vastus intermedius muscle"],hint:"vastus intermedius · deep quadriceps, under rectus femoris"},{id:"biceps_femoris",region:"hip_thigh",meshNames:[...Ft("l",["bf_long","bf_short"]),...Ft("r",["bf_long","bf_short"])],displayName:"biceps femoris",aliases:["biceps femoris","biceps femoris muscle"],hint:"biceps femoris · lateral hamstring (long + short)"},{id:"semitendinosus",region:"hip_thigh",meshNames:["semitend_l","semitend_r"],displayName:"semitendinosus",aliases:["semitendinosus","semitendinosus muscle"],hint:"semitendinosus · medial hamstring (pes anserinus)"},{id:"semimembranosus",region:"hip_thigh",meshNames:["semimemb_l","semimemb_r"],displayName:"semimembranosus",aliases:["semimembranosus","semimembranosus muscle"],hint:"semimembranosus · deepest medial hamstring"},{id:"gastrocnemius",region:"lower_leg",meshNames:[...Ft("l",["gastroc_lat","gastroc_med"]),...Ft("r",["gastroc_lat","gastroc_med"])],displayName:"gastrocnemius",aliases:["gastrocnemius","gastroc","calf muscle"],hint:"gastrocnemius · two-headed calf (crosses knee)"},{id:"soleus",region:"lower_leg",meshNames:["soleus_l","soleus_r"],displayName:"soleus",aliases:["soleus","soleus muscle"],hint:"soleus · deep calf postural muscle"},{id:"tibialis_anterior",region:"lower_leg",meshNames:["tib_ant_l","tib_ant_r"],displayName:"tibialis anterior",aliases:["tibialis anterior","tibialis anterior muscle","ta"],hint:"tibialis anterior · primary dorsiflexor"}];function Dl(i){return i.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim()}function ju(i,e){const t=Dl(i);if(!t)return!1;const n=t.replace(/\s+/g,"");return e.aliases.some(s=>{const a=Dl(s);return a===t||a.replace(/\s+/g,"")===n})}function qu(i){const e=new Set(i);return ti.filter(t=>e.has(t.region))}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xo="170",$i={ROTATE:0,DOLLY:1,PAN:2},qi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yu=0,Nl=1,$u=2,Fh=1,Ku=2,Pn=3,kn=0,zt=1,sn=2,ni=0,Ki=1,Ul=2,Ol=3,Fl=4,Zu=5,mi=100,Ju=101,Qu=102,ed=103,td=104,nd=200,id=201,sd=202,ad=203,qr=204,Yr=205,rd=206,od=207,ld=208,cd=209,hd=210,ud=211,dd=212,fd=213,pd=214,$r=0,Kr=1,Zr=2,es=3,Jr=4,Qr=5,eo=6,to=7,kh=0,md=1,gd=2,ii=0,_d=1,vd=2,bd=3,Bh=4,yd=5,xd=6,Md=7,kl="attached",Sd="detached",zh=300,ts=301,ns=302,no=303,io=304,Ja=306,is=1e3,Jn=1001,Va=1002,Dt=1003,Hh=1004,Is=1005,Wt=1006,Da=1007,Dn=1008,Bn=1009,Vh=1010,Gh=1011,Vs=1012,jo=1013,yi=1014,on=1015,qs=1016,qo=1017,Yo=1018,ss=1020,Wh=35902,Xh=1021,jh=1022,Zt=1023,qh=1024,Yh=1025,Zi=1026,as=1027,$o=1028,Ko=1029,$h=1030,Zo=1031,Jo=1033,Na=33776,Ua=33777,Oa=33778,Fa=33779,so=35840,ao=35841,ro=35842,oo=35843,lo=36196,co=37492,ho=37496,uo=37808,fo=37809,po=37810,mo=37811,go=37812,_o=37813,vo=37814,bo=37815,yo=37816,xo=37817,Mo=37818,So=37819,To=37820,Eo=37821,ka=36492,wo=36494,Ao=36495,Kh=36283,Ro=36284,Co=36285,Lo=36286,Gs=2300,Ws=2301,or=2302,Bl=2400,zl=2401,Hl=2402,Td=2500,Ed=0,Zh=1,Po=2,wd=3200,Ad=3201,Jh=0,Rd=1,Zn="",gt="srgb",Ut="srgb-linear",Qa="linear",et="srgb",wi=7680,Vl=519,Cd=512,Ld=513,Pd=514,Qh=515,Id=516,Dd=517,Nd=518,Ud=519,Io=35044,Gl="300 es",Nn=2e3,Ga=2001;class Ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wl=1234567;const Os=Math.PI/180,rs=180/Math.PI;function cn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Et[i&255]+Et[i>>8&255]+Et[i>>16&255]+Et[i>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]).toLowerCase()}function St(i,e,t){return Math.max(e,Math.min(t,i))}function Qo(i,e){return(i%e+e)%e}function Od(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Fd(i,e,t){return i!==e?(t-i)/(e-i):0}function Fs(i,e,t){return(1-t)*i+t*e}function kd(i,e,t,n){return Fs(i,e,1-Math.exp(-t*n))}function Bd(i,e=1){return e-Math.abs(Qo(i,e*2)-e)}function zd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Hd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Vd(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Gd(i,e){return i+Math.random()*(e-i)}function Wd(i){return i*(.5-Math.random())}function Xd(i){i!==void 0&&(Wl=i);let e=Wl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function jd(i){return i*Os}function qd(i){return i*rs}function Yd(i){return(i&i-1)===0&&i!==0}function $d(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Kd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Zd(i,e,t,n,s){const a=Math.cos,r=Math.sin,o=a(t/2),l=r(t/2),c=a((e+n)/2),h=r((e+n)/2),u=a((e-n)/2),d=r((e-n)/2),p=a((n-e)/2),g=r((n-e)/2);switch(s){case"XYX":i.set(o*h,l*u,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function an(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Je(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Wa={DEG2RAD:Os,RAD2DEG:rs,generateUUID:cn,clamp:St,euclideanModulo:Qo,mapLinear:Od,inverseLerp:Fd,lerp:Fs,damp:kd,pingpong:Bd,smoothstep:zd,smootherstep:Hd,randInt:Vd,randFloat:Gd,randFloatSpread:Wd,seededRandom:Xd,degToRad:jd,radToDeg:qd,isPowerOfTwo:Yd,ceilPowerOfTwo:$d,floorPowerOfTwo:Kd,setQuaternionFromProperEuler:Zd,normalize:Je,denormalize:an};class Ae{constructor(e=0,t=0){Ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*n-r*s+e.x,this.y=a*s+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,t,n,s,a,r,o,l,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,r,o,l,c)}set(e,t,n,s,a,r,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=a,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,r=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],T=s[1],E=s[4],x=s[7],U=s[2],R=s[5],w=s[8];return a[0]=r*_+o*T+l*U,a[3]=r*m+o*E+l*R,a[6]=r*f+o*x+l*w,a[1]=c*_+h*T+u*U,a[4]=c*m+h*E+u*R,a[7]=c*f+h*x+u*w,a[2]=d*_+p*T+g*U,a[5]=d*m+p*E+g*R,a[8]=d*f+p*x+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*o*c-n*a*h+n*o*l+s*a*c-s*r*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*r-o*c,d=o*l-h*a,p=c*a-r*l,g=t*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(o*n-s*r)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*a-o*t)*_,e[6]=p*_,e[7]=(n*l-c*t)*_,e[8]=(r*t-n*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(n*l,n*c,-n*(l*r+c*o)+r+e,-s*c,s*l,-s*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(lr.makeScale(e,t)),this}rotate(e){return this.premultiply(lr.makeRotation(-e)),this}translate(e,t){return this.premultiply(lr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lr=new Ue;function eu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Jd(){const i=Xs("canvas");return i.style.display="block",i}const Xl={};function Ds(i){i in Xl||(Xl[i]=!0,console.warn(i))}function Qd(i,e,t){return new Promise(function(n,s){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}function ef(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function tf(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const He={enabled:!0,workingColorSpace:Ut,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===et&&(i.r=Un(i.r),i.g=Un(i.g),i.b=Un(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===et&&(i.r=Ji(i.r),i.g=Ji(i.g),i.b=Ji(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Zn?Qa:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const jl=[.64,.33,.3,.6,.15,.06],ql=[.2126,.7152,.0722],Yl=[.3127,.329],$l=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kl=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);He.define({[Ut]:{primaries:jl,whitePoint:Yl,transfer:Qa,toXYZ:$l,fromXYZ:Kl,luminanceCoefficients:ql,workingColorSpaceConfig:{unpackColorSpace:gt},outputColorSpaceConfig:{drawingBufferColorSpace:gt}},[gt]:{primaries:jl,whitePoint:Yl,transfer:et,toXYZ:$l,fromXYZ:Kl,luminanceCoefficients:ql,outputColorSpaceConfig:{drawingBufferColorSpace:gt}}});let Ai;class nf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ai===void 0&&(Ai=Xs("canvas")),Ai.width=e.width,Ai.height=e.height;const n=Ai.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ai}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Un(a[r]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Un(t[n]/255)*255):t[n]=Un(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sf=0;class tu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=cn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(cr(s[r].image)):a.push(cr(s[r]))}else a=cr(s);n.url=a}return t||(e.images[this.uuid]=n),n}}function cr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let af=0;class Mt extends Ti{constructor(e=Mt.DEFAULT_IMAGE,t=Mt.DEFAULT_MAPPING,n=Jn,s=Jn,a=Wt,r=Dn,o=Zt,l=Bn,c=Mt.DEFAULT_ANISOTROPY,h=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=cn(),this.name="",this.source=new tu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case is:e.x=e.x-Math.floor(e.x);break;case Jn:e.x=e.x<0?0:1;break;case Va:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case is:e.y=e.y-Math.floor(e.y);break;case Jn:e.y=e.y<0?0:1;break;case Va:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Mt.DEFAULT_IMAGE=null;Mt.DEFAULT_MAPPING=zh;Mt.DEFAULT_ANISOTROPY=1;class Ye{constructor(e=0,t=0,n=0,s=1){Ye.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*n+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*n+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*n+r[11]*s+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,a;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,x=(p+1)/2,U=(f+1)/2,R=(h+d)/4,w=(u+_)/4,N=(g+m)/4;return E>x&&E>U?E<.01?(n=0,s=.707106781,a=.707106781):(n=Math.sqrt(E),s=R/n,a=w/n):x>U?x<.01?(n=.707106781,s=0,a=.707106781):(s=Math.sqrt(x),n=R/s,a=N/s):U<.01?(n=.707106781,s=.707106781,a=0):(a=Math.sqrt(U),n=w/a,s=N/a),this.set(n,s,a,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-_)/T,this.z=(d-h)/T,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rf extends Ti{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ye(0,0,e,t),this.scissorTest=!1,this.viewport=new Ye(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new Mt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new tu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xi extends rf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class nu extends Mt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class of extends Mt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,a,r,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=a[r+0],p=a[r+1],g=a[r+2],_=a[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==p||h!==g){let m=1-o;const f=l*d+c*p+h*g+u*_,T=f>=0?1:-1,E=1-f*f;if(E>Number.EPSILON){const U=Math.sqrt(E),R=Math.atan2(U,f*T);m=Math.sin(m*R)/U,o=Math.sin(o*R)/U}const x=o*T;if(l=l*m+d*x,c=c*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-o){const U=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=U,c*=U,h*=U,u*=U}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,a,r){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=a[r],d=a[r+1],p=a[r+2],g=a[r+3];return e[t]=o*g+h*u+l*p-c*d,e[t+1]=l*g+h*d+c*u-o*p,e[t+2]=c*g+h*p+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(a/2),d=l(n/2),p=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(a-c)*p,this._z=(r-s)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(a+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(a-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(r-s)/p,this._x=(a+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+r*o+s*c-a*l,this._y=s*h+r*l+a*o-n*c,this._z=a*h+r*c+n*l-s*o,this._w=r*h-n*o-s*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,a=this._z,r=this._w;let o=r*e._w+n*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=n,this._y=s,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*r+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=a*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(e=0,t=0,n=0){A.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*s,this.y=a[1]*t+a[4]*n+a[7]*s,this.z=a[2]*t+a[5]*n+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*n+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*n+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*n+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*s-o*n),h=2*(o*t-a*s),u=2*(a*n-r*t);return this.x=t+l*c+r*u-o*h,this.y=n+l*h+o*c-a*u,this.z=s+l*u+a*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s,this.y=a[1]*t+a[5]*n+a[9]*s,this.z=a[2]*t+a[6]*n+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=s*l-a*o,this.y=a*r-n*l,this.z=n*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return hr.copy(this).projectOnVector(e),this.sub(hr)}reflect(e){return this.sub(hr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hr=new A,Zl=new gn;class Xt{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,en):en.fromBufferAttribute(a,r),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qs.copy(n.boundingBox)),Qs.applyMatrix4(e.matrixWorld),this.union(Qs)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xs),ea.subVectors(this.max,xs),Ri.subVectors(e.a,xs),Ci.subVectors(e.b,xs),Li.subVectors(e.c,xs),Vn.subVectors(Ci,Ri),Gn.subVectors(Li,Ci),oi.subVectors(Ri,Li);let t=[0,-Vn.z,Vn.y,0,-Gn.z,Gn.y,0,-oi.z,oi.y,Vn.z,0,-Vn.x,Gn.z,0,-Gn.x,oi.z,0,-oi.x,-Vn.y,Vn.x,0,-Gn.y,Gn.x,0,-oi.y,oi.x,0];return!ur(t,Ri,Ci,Li,ea)||(t=[1,0,0,0,1,0,0,0,1],!ur(t,Ri,Ci,Li,ea))?!1:(ta.crossVectors(Vn,Gn),t=[ta.x,ta.y,ta.z],ur(t,Ri,Ci,Li,ea))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(En),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const En=[new A,new A,new A,new A,new A,new A,new A,new A],en=new A,Qs=new Xt,Ri=new A,Ci=new A,Li=new A,Vn=new A,Gn=new A,oi=new A,xs=new A,ea=new A,ta=new A,li=new A;function ur(i,e,t,n,s){for(let a=0,r=i.length-3;a<=r;a+=3){li.fromArray(i,a);const o=s.x*Math.abs(li.x)+s.y*Math.abs(li.y)+s.z*Math.abs(li.z),l=e.dot(li),c=t.dot(li),h=n.dot(li);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const lf=new Xt,Ms=new A,dr=new A;class bn{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):lf.setFromPoints(e).getCenter(n);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ms.subVectors(e,this.center);const t=Ms.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ms,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ms.copy(e.center).add(dr)),this.expandByPoint(Ms.copy(e.center).sub(dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wn=new A,fr=new A,na=new A,Wn=new A,pr=new A,ia=new A,mr=new A;class fs{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wn.copy(this.origin).addScaledVector(this.direction,t),wn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){fr.copy(e).add(t).multiplyScalar(.5),na.copy(t).sub(e).normalize(),Wn.copy(this.origin).sub(fr);const a=e.distanceTo(t)*.5,r=-this.direction.dot(na),o=Wn.dot(this.direction),l=-Wn.dot(na),c=Wn.lengthSq(),h=Math.abs(1-r*r);let u,d,p,g;if(h>0)if(u=r*l-o,d=r*o-l,g=a*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+r*d+2*o)+d*(r*u+d+2*l)+c}else d=a,u=Math.max(0,-(r*d+o)),p=-u*u+d*(d+2*l)+c;else d=-a,u=Math.max(0,-(r*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-r*a+o)),d=u>0?-a:Math.min(Math.max(-a,-l),a),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-a,-l),a),p=d*(d+2*l)+c):(u=Math.max(0,-(r*a+o)),d=u>0?a:Math.min(Math.max(-a,-l),a),p=-u*u+d*(d+2*l)+c);else d=r>0?-a:a,u=Math.max(0,-(r*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(fr).addScaledVector(na,d),p}intersectSphere(e,t){wn.subVectors(e.center,this.origin);const n=wn.dot(this.direction),s=wn.dot(wn)-n*n,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=n-r,l=n+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,a,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(a=(e.min.y-d.y)*h,r=(e.max.y-d.y)*h):(a=(e.max.y-d.y)*h,r=(e.min.y-d.y)*h),n>r||a>s||((a>n||isNaN(n))&&(n=a),(r<s||isNaN(s))&&(s=r),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,wn)!==null}intersectTriangle(e,t,n,s,a){pr.subVectors(t,e),ia.subVectors(n,e),mr.crossVectors(pr,ia);let r=this.direction.dot(mr),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Wn.subVectors(this.origin,e);const l=o*this.direction.dot(ia.crossVectors(Wn,ia));if(l<0)return null;const c=o*this.direction.dot(pr.cross(Wn));if(c<0||l+c>r)return null;const h=-o*Wn.dot(mr);return h<0?null:this.at(h/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Le{constructor(e,t,n,s,a,r,o,l,c,h,u,d,p,g,_,m){Le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,r,o,l,c,h,u,d,p,g,_,m)}set(e,t,n,s,a,r,o,l,c,h,u,d,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=a,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Pi.setFromMatrixColumn(e,0).length(),a=1/Pi.setFromMatrixColumn(e,1).length(),r=1/Pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,a=e.z,r=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(a),u=Math.sin(a);if(e.order==="XYZ"){const d=r*h,p=r*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+p*c,t[10]=r*l}else if(e.order==="YXZ"){const d=l*h,p=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-p,t[8]=r*c,t[1]=r*u,t[5]=r*h,t[9]=-o,t[2]=p*o-g,t[6]=_+d*o,t[10]=r*l}else if(e.order==="ZXY"){const d=l*h,p=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-r*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=r*h,t[9]=_-d*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const d=r*h,p=r*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-p,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const d=r*l,p=r*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=r*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=r*l,p=r*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=r*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cf,e,hf)}lookAt(e,t,n){const s=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),Xn.crossVectors(n,Vt),Xn.lengthSq()===0&&(Math.abs(n.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),Xn.crossVectors(n,Vt)),Xn.normalize(),sa.crossVectors(Vt,Xn),s[0]=Xn.x,s[4]=sa.x,s[8]=Vt.x,s[1]=Xn.y,s[5]=sa.y,s[9]=Vt.y,s[2]=Xn.z,s[6]=sa.z,s[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,r=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],T=n[3],E=n[7],x=n[11],U=n[15],R=s[0],w=s[4],N=s[8],M=s[12],y=s[1],C=s[5],W=s[9],z=s[13],$=s[2],K=s[6],j=s[10],J=s[14],V=s[3],ae=s[7],ue=s[11],xe=s[15];return a[0]=r*R+o*y+l*$+c*V,a[4]=r*w+o*C+l*K+c*ae,a[8]=r*N+o*W+l*j+c*ue,a[12]=r*M+o*z+l*J+c*xe,a[1]=h*R+u*y+d*$+p*V,a[5]=h*w+u*C+d*K+p*ae,a[9]=h*N+u*W+d*j+p*ue,a[13]=h*M+u*z+d*J+p*xe,a[2]=g*R+_*y+m*$+f*V,a[6]=g*w+_*C+m*K+f*ae,a[10]=g*N+_*W+m*j+f*ue,a[14]=g*M+_*z+m*J+f*xe,a[3]=T*R+E*y+x*$+U*V,a[7]=T*w+E*C+x*K+U*ae,a[11]=T*N+E*W+x*j+U*ue,a[15]=T*M+E*z+x*J+U*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+a*l*u-s*c*u-a*o*d+n*c*d+s*o*p-n*l*p)+_*(+t*l*p-t*c*d+a*r*d-s*r*p+s*c*h-a*l*h)+m*(+t*c*u-t*o*p-a*r*u+n*r*p+a*o*h-n*c*h)+f*(-s*o*h-t*l*u+t*o*d+s*r*u-n*r*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],T=u*m*c-_*d*c+_*l*p-o*m*p-u*l*f+o*d*f,E=g*d*c-h*m*c-g*l*p+r*m*p+h*l*f-r*d*f,x=h*_*c-g*u*c+g*o*p-r*_*p-h*o*f+r*u*f,U=g*u*l-h*_*l-g*o*d+r*_*d+h*o*m-r*u*m,R=t*T+n*E+s*x+a*U;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=T*w,e[1]=(_*d*a-u*m*a-_*s*p+n*m*p+u*s*f-n*d*f)*w,e[2]=(o*m*a-_*l*a+_*s*c-n*m*c-o*s*f+n*l*f)*w,e[3]=(u*l*a-o*d*a-u*s*c+n*d*c+o*s*p-n*l*p)*w,e[4]=E*w,e[5]=(h*m*a-g*d*a+g*s*p-t*m*p-h*s*f+t*d*f)*w,e[6]=(g*l*a-r*m*a-g*s*c+t*m*c+r*s*f-t*l*f)*w,e[7]=(r*d*a-h*l*a+h*s*c-t*d*c-r*s*p+t*l*p)*w,e[8]=x*w,e[9]=(g*u*a-h*_*a-g*n*p+t*_*p+h*n*f-t*u*f)*w,e[10]=(r*_*a-g*o*a+g*n*c-t*_*c-r*n*f+t*o*f)*w,e[11]=(h*o*a-r*u*a-h*n*c+t*u*c+r*n*p-t*o*p)*w,e[12]=U*w,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*w,e[14]=(g*o*s-r*_*s-g*n*l+t*_*l+r*n*m-t*o*m)*w,e[15]=(r*u*s-h*o*s+h*n*l-t*u*l-r*n*d+t*o*d)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,a=e.z;return t[0]*=n,t[4]*=s,t[8]*=a,t[1]*=n,t[5]*=s,t[9]*=a,t[2]*=n,t[6]*=s,t[10]*=a,t[3]*=n,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),a=1-n,r=e.x,o=e.y,l=e.z,c=a*r,h=a*o;return this.set(c*r+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*r,0,c*l-s*o,h*l+s*r,a*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,a,r){return this.set(1,n,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,h=r+r,u=o+o,d=a*c,p=a*h,g=a*u,_=r*h,m=r*u,f=o*u,T=l*c,E=l*h,x=l*u,U=n.x,R=n.y,w=n.z;return s[0]=(1-(_+f))*U,s[1]=(p+x)*U,s[2]=(g-E)*U,s[3]=0,s[4]=(p-x)*R,s[5]=(1-(d+f))*R,s[6]=(m+T)*R,s[7]=0,s[8]=(g+E)*w,s[9]=(m-T)*w,s[10]=(1-(d+_))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let a=Pi.set(s[0],s[1],s[2]).length();const r=Pi.set(s[4],s[5],s[6]).length(),o=Pi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],tn.copy(this);const c=1/a,h=1/r,u=1/o;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,t.setFromRotationMatrix(tn),n.x=a,n.y=r,n.z=o,this}makePerspective(e,t,n,s,a,r,o=Nn){const l=this.elements,c=2*a/(t-e),h=2*a/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let p,g;if(o===Nn)p=-(r+a)/(r-a),g=-2*r*a/(r-a);else if(o===Ga)p=-r/(r-a),g=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,a,r,o=Nn){const l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(r-a),d=(t+e)*c,p=(n+s)*h;let g,_;if(o===Nn)g=(r+a)*u,_=-2*u;else if(o===Ga)g=a*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Pi=new A,tn=new Le,cf=new A(0,0,0),hf=new A(1,1,1),Xn=new A,sa=new A,Vt=new A,Jl=new Le,Ql=new gn;class _n{constructor(e=0,t=0,n=0,s=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(St(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-St(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(St(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(St(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-St(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Jl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ql.setFromEuler(this),this.setFromQuaternion(Ql,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class el{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uf=0;const ec=new A,Ii=new gn,An=new Le,aa=new A,Ss=new A,df=new A,ff=new gn,tc=new A(1,0,0),nc=new A(0,1,0),ic=new A(0,0,1),sc={type:"added"},pf={type:"removed"},Di={type:"childadded",child:null},gr={type:"childremoved",child:null};class ct extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ct.DEFAULT_UP.clone();const e=new A,t=new _n,n=new gn,s=new A(1,1,1);function a(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Le},normalMatrix:{value:new Ue}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new el,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.premultiply(Ii),this}rotateX(e){return this.rotateOnAxis(tc,e)}rotateY(e){return this.rotateOnAxis(nc,e)}rotateZ(e){return this.rotateOnAxis(ic,e)}translateOnAxis(e,t){return ec.copy(e).applyQuaternion(this.quaternion),this.position.add(ec.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(tc,e)}translateY(e){return this.translateOnAxis(nc,e)}translateZ(e){return this.translateOnAxis(ic,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?aa.copy(e):aa.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(Ss,aa,this.up):An.lookAt(aa,Ss,this.up),this.quaternion.setFromRotationMatrix(An),s&&(An.extractRotation(s.matrixWorld),Ii.setFromRotationMatrix(An),this.quaternion.premultiply(Ii.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sc),Di.child=e,this.dispatchEvent(Di),Di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pf),gr.child=e,this.dispatchEvent(gr),gr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),An.multiply(e.parent.matrixWorld)),e.applyMatrix4(An),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sc),Di.child=e,this.dispatchEvent(Di),Di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,e,df),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,ff,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];a(e.shapes,u)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),u=r(e.shapes),d=r(e.skeletons),p=r(e.animations),g=r(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ct.DEFAULT_UP=new A(0,1,0);ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new A,Rn=new A,_r=new A,Cn=new A,Ni=new A,Ui=new A,ac=new A,vr=new A,br=new A,yr=new A,xr=new Ye,Mr=new Ye,Sr=new Ye;class rn{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),nn.subVectors(e,t),s.cross(nn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,n,s,a){nn.subVectors(s,t),Rn.subVectors(n,t),_r.subVectors(e,t);const r=nn.dot(nn),o=nn.dot(Rn),l=nn.dot(_r),c=Rn.dot(Rn),h=Rn.dot(_r),u=r*c-o*o;if(u===0)return a.set(0,0,0),null;const d=1/u,p=(c*l-o*h)*d,g=(r*h-o*l)*d;return a.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(e,t,n,s,a,r,o,l){return this.getBarycoord(e,t,n,s,Cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Cn.x),l.addScaledVector(r,Cn.y),l.addScaledVector(o,Cn.z),l)}static getInterpolatedAttribute(e,t,n,s,a,r){return xr.setScalar(0),Mr.setScalar(0),Sr.setScalar(0),xr.fromBufferAttribute(e,t),Mr.fromBufferAttribute(e,n),Sr.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(xr,a.x),r.addScaledVector(Mr,a.y),r.addScaledVector(Sr,a.z),r}static isFrontFacing(e,t,n,s){return nn.subVectors(n,t),Rn.subVectors(e,t),nn.cross(Rn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),nn.cross(Rn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,a){return rn.getInterpolation(e,this.a,this.b,this.c,t,n,s,a)}containsPoint(e){return rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,a=this.c;let r,o;Ni.subVectors(s,n),Ui.subVectors(a,n),vr.subVectors(e,n);const l=Ni.dot(vr),c=Ui.dot(vr);if(l<=0&&c<=0)return t.copy(n);br.subVectors(e,s);const h=Ni.dot(br),u=Ui.dot(br);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(n).addScaledVector(Ni,r);yr.subVectors(e,a);const p=Ni.dot(yr),g=Ui.dot(yr);if(g>=0&&p<=g)return t.copy(a);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ui,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return ac.subVectors(a,s),o=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(ac,o);const f=1/(m+_+d);return r=_*f,o=d*f,t.copy(n).addScaledVector(Ni,r).addScaledVector(Ui,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const iu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},ra={h:0,s:0,l:0};function Tr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ee{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,He.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=He.workingColorSpace){return this.r=e,this.g=t,this.b=n,He.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=He.workingColorSpace){if(e=Qo(e,1),t=St(t,0,1),n=St(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,r=2*n-a;this.r=Tr(r,a,e+1/3),this.g=Tr(r,a,e),this.b=Tr(r,a,e-1/3)}return He.toWorkingColorSpace(this,s),this}setStyle(e,t=gt){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gt){const n=iu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Un(e.r),this.g=Un(e.g),this.b=Un(e.b),this}copyLinearToSRGB(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gt){return He.fromWorkingColorSpace(wt.copy(this),e),Math.round(St(wt.r*255,0,255))*65536+Math.round(St(wt.g*255,0,255))*256+Math.round(St(wt.b*255,0,255))}getHexString(e=gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=He.workingColorSpace){He.fromWorkingColorSpace(wt.copy(this),t);const n=wt.r,s=wt.g,a=wt.b,r=Math.max(n,s,a),o=Math.min(n,s,a);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const u=r-o;switch(c=h<=.5?u/(r+o):u/(2-r-o),r){case n:l=(s-a)/u+(s<a?6:0);break;case s:l=(a-n)/u+2;break;case a:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=He.workingColorSpace){return He.fromWorkingColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=gt){He.fromWorkingColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,s=wt.b;return e!==gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(ra);const n=Fs(jn.h,ra.h,t),s=Fs(jn.s,ra.s,t),a=Fs(jn.l,ra.l,t);return this.setHSL(n,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*s,this.g=a[1]*t+a[4]*n+a[7]*s,this.b=a[2]*t+a[5]*n+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new Ee;Ee.NAMES=iu;let mf=0;class mn extends Ti{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=cn(),this.name="",this.blending=Ki,this.side=kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qr,this.blendDst=Yr,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qr&&(n.blendSrc=this.blendSrc),this.blendDst!==Yr&&(n.blendDst=this.blendDst),this.blendEquation!==mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(n.textures=a),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let a=0;a!==s;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _i extends mn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=kh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new A,oa=new Ae;class Nt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Io,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)oa.fromBufferAttribute(this,t),oa.applyMatrix3(e),this.setXY(t,oa.x,oa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,a){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array),a=Je(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Io&&(e.usage=this.usage),e}}class su extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class au extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class On extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let gf=0;const $t=new Le,Er=new ct,Oi=new A,Gt=new Xt,Ts=new Xt,bt=new A;class yn extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(eu(e)?au:su)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ue().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return Er.lookAt(e),Er.updateMatrix(),this.applyMatrix4(Er.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Oi).negate(),this.translate(Oi.x,Oi.y,Oi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,a=e.length;s<a;s++){const r=e[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new On(n,3))}else{for(let n=0,s=t.count;n<s;n++){const a=e[n];t.setXYZ(n,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const a=t[n];Gt.setFromBufferAttribute(a),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){const n=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];Ts.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(Gt.min,Ts.min),Gt.expandByPoint(bt),bt.addVectors(Gt.max,Ts.max),Gt.expandByPoint(bt)):(Gt.expandByPoint(Ts.min),Gt.expandByPoint(Ts.max))}Gt.getCenter(n);let s=0;for(let a=0,r=e.count;a<r;a++)bt.fromBufferAttribute(e,a),s=Math.max(s,n.distanceToSquared(bt));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)bt.fromBufferAttribute(o,c),l&&(Oi.fromBufferAttribute(e,c),bt.add(Oi)),s=Math.max(s,n.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let N=0;N<n.count;N++)o[N]=new A,l[N]=new A;const c=new A,h=new A,u=new A,d=new Ae,p=new Ae,g=new Ae,_=new A,m=new A;function f(N,M,y){c.fromBufferAttribute(n,N),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,y),d.fromBufferAttribute(a,N),p.fromBufferAttribute(a,M),g.fromBufferAttribute(a,y),h.sub(c),u.sub(c),p.sub(d),g.sub(d);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(C),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),o[N].add(_),o[M].add(_),o[y].add(_),l[N].add(m),l[M].add(m),l[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let N=0,M=T.length;N<M;++N){const y=T[N],C=y.start,W=y.count;for(let z=C,$=C+W;z<$;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const E=new A,x=new A,U=new A,R=new A;function w(N){U.fromBufferAttribute(s,N),R.copy(U);const M=o[N];E.copy(M),E.sub(U.multiplyScalar(U.dot(M))).normalize(),x.crossVectors(R,M);const C=x.dot(l[N])<0?-1:1;r.setXYZW(N,E.x,E.y,E.z,C)}for(let N=0,M=T.length;N<M;++N){const y=T[N],C=y.start,W=y.count;for(let z=C,$=C+W;z<$;z+=3)w(e.getX(z+0)),w(e.getX(z+1)),w(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new A,a=new A,r=new A,o=new A,l=new A,c=new A,h=new A,u=new A;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),r.fromBufferAttribute(t,m),h.subVectors(r,a),u.subVectors(s,a),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),h.subVectors(r,a),u.subVectors(s,a),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new Nt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=e(d,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const a=e.morphAttributes;for(const c in a){const h=[],u=a[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rc=new Le,ci=new fs,la=new bn,oc=new A,ca=new A,ha=new A,ua=new A,wr=new A,da=new A,lc=new A,fa=new A;class xt extends ct{constructor(e=new yn,t=new _i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,a=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){da.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const h=o[l],u=a[l];h!==0&&(wr.fromBufferAttribute(u,e),r?da.addScaledVector(wr,h):da.addScaledVector(wr.sub(t),h))}t.add(da)}return t}raycast(e,t){const n=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),la.copy(n.boundingSphere),la.applyMatrix4(a),ci.copy(e.ray).recast(e.near),!(la.containsPoint(ci.origin)===!1&&(ci.intersectSphere(la,oc)===null||ci.origin.distanceToSquared(oc)>(e.far-e.near)**2))&&(rc.copy(a).invert(),ci.copy(e.ray).applyMatrix4(rc),!(n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ci)))}_computeIntersections(e,t,n){let s;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,u=a.attributes.normal,d=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=r[m.materialIndex],T=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=T,U=E;x<U;x+=3){const R=o.getX(x),w=o.getX(x+1),N=o.getX(x+2);s=pa(this,f,e,n,c,h,u,R,w,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const T=o.getX(m),E=o.getX(m+1),x=o.getX(m+2);s=pa(this,r,e,n,c,h,u,T,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=r[m.materialIndex],T=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=T,U=E;x<U;x+=3){const R=x,w=x+1,N=x+2;s=pa(this,f,e,n,c,h,u,R,w,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const T=m,E=m+1,x=m+2;s=pa(this,r,e,n,c,h,u,T,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function _f(i,e,t,n,s,a,r,o){let l;if(e.side===zt?l=n.intersectTriangle(r,a,s,!0,o):l=n.intersectTriangle(s,a,r,e.side===kn,o),l===null)return null;fa.copy(o),fa.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(fa);return c<t.near||c>t.far?null:{distance:c,point:fa.clone(),object:i}}function pa(i,e,t,n,s,a,r,o,l,c){i.getVertexPosition(o,ca),i.getVertexPosition(l,ha),i.getVertexPosition(c,ua);const h=_f(i,e,t,n,ca,ha,ua,lc);if(h){const u=new A;rn.getBarycoord(lc,ca,ha,ua,u),s&&(h.uv=rn.getInterpolatedAttribute(s,o,l,c,u,new Ae)),a&&(h.uv1=rn.getInterpolatedAttribute(a,o,l,c,u,new Ae)),r&&(h.normal=rn.getInterpolatedAttribute(r,o,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new A,materialIndex:0};rn.getNormal(ca,ha,ua,d.normal),h.face=d,h.barycoord=u}return h}class Ys extends yn{constructor(e=1,t=1,n=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,t,e,r,a,0),g("z","y","x",1,-1,n,t,-e,r,a,1),g("x","z","y",1,1,e,n,t,s,r,2),g("x","z","y",1,-1,e,n,-t,s,r,3),g("x","y","z",1,-1,e,t,n,s,a,4),g("x","y","z",-1,-1,e,t,-n,s,a,5),this.setIndex(l),this.setAttribute("position",new On(c,3)),this.setAttribute("normal",new On(h,3)),this.setAttribute("uv",new On(u,2));function g(_,m,f,T,E,x,U,R,w,N,M){const y=x/w,C=U/N,W=x/2,z=U/2,$=R/2,K=w+1,j=N+1;let J=0,V=0;const ae=new A;for(let ue=0;ue<j;ue++){const xe=ue*C-z;for(let ke=0;ke<K;ke++){const nt=ke*y-W;ae[_]=nt*T,ae[m]=xe*E,ae[f]=$,c.push(ae.x,ae.y,ae.z),ae[_]=0,ae[m]=0,ae[f]=R>0?1:-1,h.push(ae.x,ae.y,ae.z),u.push(ke/w),u.push(1-ue/N),J+=1}}for(let ue=0;ue<N;ue++)for(let xe=0;xe<w;xe++){const ke=d+xe+K*ue,nt=d+xe+K*(ue+1),X=d+(xe+1)+K*(ue+1),te=d+(xe+1)+K*ue;l.push(ke,nt,te),l.push(nt,X,te),V+=6}o.addGroup(p,V,M),p+=V,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function os(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Lt(i){const e={};for(let t=0;t<i.length;t++){const n=os(i[t]);for(const s in n)e[s]=n[s]}return e}function vf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ru(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:He.workingColorSpace}const bf={clone:os,merge:Lt};var yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends mn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yf,this.fragmentShader=xf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=vf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ou extends ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=Nn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const qn=new A,cc=new Ae,hc=new Ae;class Rt extends ou{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Os*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rs*2*Math.atan(Math.tan(Os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qn.x,qn.y).multiplyScalar(-e/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qn.x,qn.y).multiplyScalar(-e/qn.z)}getViewSize(e,t){return this.getViewBounds(e,cc,hc),t.subVectors(hc,cc)}setViewOffset(e,t,n,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Os*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,t-=r.offsetY*n/c,s*=r.width/l,n*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Fi=-90,ki=1;class Mf extends ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Rt(Fi,ki,e,t);s.layers=this.layers,this.add(s);const a=new Rt(Fi,ki,e,t);a.layers=this.layers,this.add(a);const r=new Rt(Fi,ki,e,t);r.layers=this.layers,this.add(r);const o=new Rt(Fi,ki,e,t);o.layers=this.layers,this.add(o);const l=new Rt(Fi,ki,e,t);l.layers=this.layers,this.add(l);const c=new Rt(Fi,ki,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ga)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,a),e.setRenderTarget(n,1,s),e.render(t,r),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class lu extends Mt{constructor(e,t,n,s,a,r,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:ts,super(e,t,n,s,a,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Sf extends xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new lu(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Wt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ys(5,5,5),a=new ai({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:ni});a.uniforms.tEquirect.value=t;const r=new xt(s,a),o=t.minFilter;return t.minFilter===Dn&&(t.minFilter=Wt),new Mf(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,s){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,s);e.setRenderTarget(a)}}const Ar=new A,Tf=new A,Ef=new Ue;class $n{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ar.subVectors(n,t).cross(Tf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ar),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ef.getNormalMatrix(e),s=this.coplanarPoint(Ar).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hi=new bn,ma=new A;class tl{constructor(e=new $n,t=new $n,n=new $n,s=new $n,a=new $n,r=new $n){this.planes=[e,t,n,s,a,r]}set(e,t,n,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Nn){const n=this.planes,s=e.elements,a=s[0],r=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],T=s[13],E=s[14],x=s[15];if(n[0].setComponents(l-a,d-c,m-p,x-f).normalize(),n[1].setComponents(l+a,d+c,m+p,x+f).normalize(),n[2].setComponents(l+r,d+h,m+g,x+T).normalize(),n[3].setComponents(l-r,d-h,m-g,x-T).normalize(),n[4].setComponents(l-o,d-u,m-_,x-E).normalize(),t===Nn)n[5].setComponents(l+o,d+u,m+_,x+E).normalize();else if(t===Ga)n[5].setComponents(o,u,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(e){return hi.center.set(0,0,0),hi.radius=.7071067811865476,hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ma.x=s.normal.x>0?e.max.x:e.min.x,ma.y=s.normal.y>0?e.max.y:e.min.y,ma.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ma)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cu(){let i=null,e=!1,t=null,n=null;function s(a,r){t(a,r),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function wf(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}class er extends yn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const T=f*d-r;for(let E=0;E<c;E++){const x=E*u-a;g.push(x,-T,0),_.push(0,0,1),m.push(E/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<o;T++){const E=T+c*f,x=T+c*(f+1),U=T+1+c*(f+1),R=T+1+c*f;p.push(E,x,R),p.push(x,U,R)}this.setIndex(p),this.setAttribute("position",new On(g,3)),this.setAttribute("normal",new On(_,3)),this.setAttribute("uv",new On(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new er(e.width,e.height,e.widthSegments,e.heightSegments)}}var Af=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,If=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Df=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Nf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Of=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ff=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,$f=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Kf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ep=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,np=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ip="gl_FragColor = linearToOutputTexel( gl_FragColor );",sp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ap=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,op=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,up=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ep=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ap=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Rp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ip=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Np=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Op=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Gp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,jp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$p=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,em=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,im=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,om=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,cm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,um=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_m=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ym=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Em=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Am=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Nm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Um=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,km=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Hm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Xm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ym=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$m=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Km=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ng=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ag=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:Af,alphahash_pars_fragment:Rf,alphamap_fragment:Cf,alphamap_pars_fragment:Lf,alphatest_fragment:Pf,alphatest_pars_fragment:If,aomap_fragment:Df,aomap_pars_fragment:Nf,batching_pars_vertex:Uf,batching_vertex:Of,begin_vertex:Ff,beginnormal_vertex:kf,bsdfs:Bf,iridescence_fragment:zf,bumpmap_pars_fragment:Hf,clipping_planes_fragment:Vf,clipping_planes_pars_fragment:Gf,clipping_planes_pars_vertex:Wf,clipping_planes_vertex:Xf,color_fragment:jf,color_pars_fragment:qf,color_pars_vertex:Yf,color_vertex:$f,common:Kf,cube_uv_reflection_fragment:Zf,defaultnormal_vertex:Jf,displacementmap_pars_vertex:Qf,displacementmap_vertex:ep,emissivemap_fragment:tp,emissivemap_pars_fragment:np,colorspace_fragment:ip,colorspace_pars_fragment:sp,envmap_fragment:ap,envmap_common_pars_fragment:rp,envmap_pars_fragment:op,envmap_pars_vertex:lp,envmap_physical_pars_fragment:bp,envmap_vertex:cp,fog_vertex:hp,fog_pars_vertex:up,fog_fragment:dp,fog_pars_fragment:fp,gradientmap_pars_fragment:pp,lightmap_pars_fragment:mp,lights_lambert_fragment:gp,lights_lambert_pars_fragment:_p,lights_pars_begin:vp,lights_toon_fragment:yp,lights_toon_pars_fragment:xp,lights_phong_fragment:Mp,lights_phong_pars_fragment:Sp,lights_physical_fragment:Tp,lights_physical_pars_fragment:Ep,lights_fragment_begin:wp,lights_fragment_maps:Ap,lights_fragment_end:Rp,logdepthbuf_fragment:Cp,logdepthbuf_pars_fragment:Lp,logdepthbuf_pars_vertex:Pp,logdepthbuf_vertex:Ip,map_fragment:Dp,map_pars_fragment:Np,map_particle_fragment:Up,map_particle_pars_fragment:Op,metalnessmap_fragment:Fp,metalnessmap_pars_fragment:kp,morphinstance_vertex:Bp,morphcolor_vertex:zp,morphnormal_vertex:Hp,morphtarget_pars_vertex:Vp,morphtarget_vertex:Gp,normal_fragment_begin:Wp,normal_fragment_maps:Xp,normal_pars_fragment:jp,normal_pars_vertex:qp,normal_vertex:Yp,normalmap_pars_fragment:$p,clearcoat_normal_fragment_begin:Kp,clearcoat_normal_fragment_maps:Zp,clearcoat_pars_fragment:Jp,iridescence_pars_fragment:Qp,opaque_fragment:em,packing:tm,premultiplied_alpha_fragment:nm,project_vertex:im,dithering_fragment:sm,dithering_pars_fragment:am,roughnessmap_fragment:rm,roughnessmap_pars_fragment:om,shadowmap_pars_fragment:lm,shadowmap_pars_vertex:cm,shadowmap_vertex:hm,shadowmask_pars_fragment:um,skinbase_vertex:dm,skinning_pars_vertex:fm,skinning_vertex:pm,skinnormal_vertex:mm,specularmap_fragment:gm,specularmap_pars_fragment:_m,tonemapping_fragment:vm,tonemapping_pars_fragment:bm,transmission_fragment:ym,transmission_pars_fragment:xm,uv_pars_fragment:Mm,uv_pars_vertex:Sm,uv_vertex:Tm,worldpos_vertex:Em,background_vert:wm,background_frag:Am,backgroundCube_vert:Rm,backgroundCube_frag:Cm,cube_vert:Lm,cube_frag:Pm,depth_vert:Im,depth_frag:Dm,distanceRGBA_vert:Nm,distanceRGBA_frag:Um,equirect_vert:Om,equirect_frag:Fm,linedashed_vert:km,linedashed_frag:Bm,meshbasic_vert:zm,meshbasic_frag:Hm,meshlambert_vert:Vm,meshlambert_frag:Gm,meshmatcap_vert:Wm,meshmatcap_frag:Xm,meshnormal_vert:jm,meshnormal_frag:qm,meshphong_vert:Ym,meshphong_frag:$m,meshphysical_vert:Km,meshphysical_frag:Zm,meshtoon_vert:Jm,meshtoon_frag:Qm,points_vert:eg,points_frag:tg,shadow_vert:ng,shadow_frag:ig,sprite_vert:sg,sprite_frag:ag},ne={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},fn={basic:{uniforms:Lt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Lt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Lt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Lt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Lt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Lt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Lt([ne.points,ne.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Lt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Lt([ne.common,ne.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Lt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Lt([ne.sprite,ne.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Lt([ne.common,ne.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Lt([ne.lights,ne.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};fn.physical={uniforms:Lt([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const ga={r:0,b:0,g:0},ui=new _n,rg=new Le;function og(i,e,t,n,s,a,r){const o=new Ee(0);let l=a===!0?0:1,c,h,u=null,d=0,p=null;function g(T){let E=T.isScene===!0?T.background:null;return E&&E.isTexture&&(E=(T.backgroundBlurriness>0?t:e).get(E)),E}function _(T){let E=!1;const x=g(T);x===null?f(o,l):x&&x.isColor&&(f(x,1),E=!0);const U=i.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,r):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,E){const x=g(E);x&&(x.isCubeTexture||x.mapping===Ja)?(h===void 0&&(h=new xt(new Ys(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:os(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(U,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ui.copy(E.backgroundRotation),ui.x*=-1,ui.y*=-1,ui.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(rg.makeRotationFromEuler(ui)),h.material.toneMapped=He.getTransfer(x.colorSpace)!==et,(u!==x||d!==x.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=i.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new xt(new er(2,2),new ai({name:"BackgroundMaterial",uniforms:os(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=He.getTransfer(x.colorSpace)!==et,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,p=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function f(T,E){T.getRGB(ga,ru(i)),n.buffers.color.setClear(ga.r,ga.g,ga.b,E,r)}return{getClearColor:function(){return o},setClearColor:function(T,E=1){o.set(T),l=E,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,f(o,l)},render:_,addToRenderList:m}}function lg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let a=s,r=!1;function o(y,C,W,z,$){let K=!1;const j=u(z,W,C);a!==j&&(a=j,c(a.object)),K=p(y,z,W,$),K&&g(y,z,W,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(K||r)&&(r=!1,x(y,C,W,z),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,C,W){const z=W.wireframe===!0;let $=n[y.id];$===void 0&&($={},n[y.id]=$);let K=$[C.id];K===void 0&&(K={},$[C.id]=K);let j=K[z];return j===void 0&&(j=d(l()),K[z]=j),j}function d(y){const C=[],W=[],z=[];for(let $=0;$<t;$++)C[$]=0,W[$]=0,z[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:W,attributeDivisors:z,object:y,attributes:{},index:null}}function p(y,C,W,z){const $=a.attributes,K=C.attributes;let j=0;const J=W.getAttributes();for(const V in J)if(J[V].location>=0){const ue=$[V];let xe=K[V];if(xe===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(xe=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(xe=y.instanceColor)),ue===void 0||ue.attribute!==xe||xe&&ue.data!==xe.data)return!0;j++}return a.attributesNum!==j||a.index!==z}function g(y,C,W,z){const $={},K=C.attributes;let j=0;const J=W.getAttributes();for(const V in J)if(J[V].location>=0){let ue=K[V];ue===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(ue=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(ue=y.instanceColor));const xe={};xe.attribute=ue,ue&&ue.data&&(xe.data=ue.data),$[V]=xe,j++}a.attributes=$,a.attributesNum=j,a.index=z}function _(){const y=a.newAttributes;for(let C=0,W=y.length;C<W;C++)y[C]=0}function m(y){f(y,0)}function f(y,C){const W=a.newAttributes,z=a.enabledAttributes,$=a.attributeDivisors;W[y]=1,z[y]===0&&(i.enableVertexAttribArray(y),z[y]=1),$[y]!==C&&(i.vertexAttribDivisor(y,C),$[y]=C)}function T(){const y=a.newAttributes,C=a.enabledAttributes;for(let W=0,z=C.length;W<z;W++)C[W]!==y[W]&&(i.disableVertexAttribArray(W),C[W]=0)}function E(y,C,W,z,$,K,j){j===!0?i.vertexAttribIPointer(y,C,W,$,K):i.vertexAttribPointer(y,C,W,z,$,K)}function x(y,C,W,z){_();const $=z.attributes,K=W.getAttributes(),j=C.defaultAttributeValues;for(const J in K){const V=K[J];if(V.location>=0){let ae=$[J];if(ae===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor)),ae!==void 0){const ue=ae.normalized,xe=ae.itemSize,ke=e.get(ae);if(ke===void 0)continue;const nt=ke.buffer,X=ke.type,te=ke.bytesPerElement,ve=X===i.INT||X===i.UNSIGNED_INT||ae.gpuType===jo;if(ae.isInterleavedBufferAttribute){const re=ae.data,we=re.stride,Pe=ae.offset;if(re.isInstancedInterleavedBuffer){for(let Be=0;Be<V.locationSize;Be++)f(V.location+Be,re.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Be=0;Be<V.locationSize;Be++)m(V.location+Be);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let Be=0;Be<V.locationSize;Be++)E(V.location+Be,xe/V.locationSize,X,ue,we*te,(Pe+xe/V.locationSize*Be)*te,ve)}else{if(ae.isInstancedBufferAttribute){for(let re=0;re<V.locationSize;re++)f(V.location+re,ae.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let re=0;re<V.locationSize;re++)m(V.location+re);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let re=0;re<V.locationSize;re++)E(V.location+re,xe/V.locationSize,X,ue,xe*te,xe/V.locationSize*re*te,ve)}}else if(j!==void 0){const ue=j[J];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(V.location,ue);break;case 3:i.vertexAttrib3fv(V.location,ue);break;case 4:i.vertexAttrib4fv(V.location,ue);break;default:i.vertexAttrib1fv(V.location,ue)}}}}T()}function U(){N();for(const y in n){const C=n[y];for(const W in C){const z=C[W];for(const $ in z)h(z[$].object),delete z[$];delete C[W]}delete n[y]}}function R(y){if(n[y.id]===void 0)return;const C=n[y.id];for(const W in C){const z=C[W];for(const $ in z)h(z[$].object),delete z[$];delete C[W]}delete n[y.id]}function w(y){for(const C in n){const W=n[C];if(W[y.id]===void 0)continue;const z=W[y.id];for(const $ in z)h(z[$].object),delete z[$];delete W[y.id]}}function N(){M(),r=!0,a!==s&&(a=s,c(a.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:M,dispose:U,releaseStatesOfGeometry:R,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:T}}function cg(i,e,t){let n;function s(c){n=c}function a(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function r(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function l(c,h,u,d){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)r(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function hg(i,e,t,n){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(w){return!(w!==Zt&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const N=w===qs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Bn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==on&&!N)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),U=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:U,maxSamples:R}}function ug(i){const e=this;let t=null,n=0,s=!1,a=!1;const r=new $n,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||a&&!m)a?h(null):c();else{const T=a?0:n,E=T*4;let x=f.clippingState||null;l.value=x,x=h(g,d,E,p);for(let U=0;U!==E;++U)x[U]=t[U];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,x=p;E!==_;++E,x+=4)r.copy(u[E]).applyMatrix4(T,o),r.normal.toArray(m,x),m[x+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function dg(i){let e=new WeakMap;function t(r,o){return o===no?r.mapping=ts:o===io&&(r.mapping=ns),r}function n(r){if(r&&r.isTexture){const o=r.mapping;if(o===no||o===io)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Sf(l.height);return c.fromEquirectangularTexture(i,r),e.set(r,c),r.addEventListener("dispose",s),t(c.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:n,dispose:a}}class nl extends ou{constructor(e=-1,t=1,n=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=n-e,r=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Yi=4,uc=[.125,.215,.35,.446,.526,.582],gi=20,Rr=new nl,dc=new Ee;let Cr=null,Lr=0,Pr=0,Ir=!1;const pi=(1+Math.sqrt(5))/2,Bi=1/pi,fc=[new A(-pi,Bi,0),new A(pi,Bi,0),new A(-Bi,0,pi),new A(Bi,0,pi),new A(0,pi,-Bi),new A(0,pi,Bi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class pc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Cr=this._renderer.getRenderTarget(),Lr=this._renderer.getActiveCubeFace(),Pr=this._renderer.getActiveMipmapLevel(),Ir=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Cr,Lr,Pr),this._renderer.xr.enabled=Ir,e.scissorTest=!1,_a(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ts||e.mapping===ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Cr=this._renderer.getRenderTarget(),Lr=this._renderer.getActiveCubeFace(),Pr=this._renderer.getActiveMipmapLevel(),Ir=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:qs,format:Zt,colorSpace:Ut,depthBuffer:!1},s=mc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mc(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=fg(a)),this._blurMaterial=pg(a,e,t)}return s}_compileMaterial(e){const t=new xt(this._lodPlanes[0],e);this._renderer.compile(t,Rr)}_sceneToCubeUV(e,t,n,s){const o=new Rt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(dc),h.toneMapping=ii,h.autoClear=!1;const p=new _i({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1}),g=new xt(new Ys,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(dc),_=!0);for(let f=0;f<6;f++){const T=f%3;T===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):T===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const E=this._cubeSize;_a(s,T*E,f>2?E:0,E,E),h.setRenderTarget(s),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ts||e.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_c()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gc());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new xt(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;_a(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(r,Rr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=fc[(s-a-1)%fc.length];this._blur(e,a-1,a,r,o)}t.autoClear=n}_blur(e,t,n,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,s,"latitudinal",a),this._halfBlur(r,e,n,n,s,"longitudinal",a)}_halfBlur(e,t,n,s,a,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new xt(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*gi-1),_=a/g,m=isFinite(a)?1+Math.floor(h*_):gi;m>gi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gi}`);const f=[];let T=0;for(let w=0;w<gi;++w){const N=w/_,M=Math.exp(-N*N/2);f.push(M),w===0?T+=M:w<m&&(T+=2*M)}for(let w=0;w<f.length;w++)f[w]=f[w]/T;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=r==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=g,d.mipInt.value=E-n;const x=this._sizeLods[s],U=3*x*(s>E-Yi?s-E+Yi:0),R=4*(this._cubeSize-x);_a(t,U,R,3*x,2*x),l.setRenderTarget(t),l.render(u,Rr)}}function fg(i){const e=[],t=[],n=[];let s=i;const a=i-Yi+1+uc.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let l=1/o;r>i-Yi?l=uc[r-i+Yi-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,T=new Float32Array(_*g*p),E=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let R=0;R<p;R++){const w=R%3*2/3-1,N=R>2?0:-1,M=[w,N,0,w+2/3,N,0,w+2/3,N+1,0,w,N,0,w+2/3,N+1,0,w,N+1,0];T.set(M,_*g*R),E.set(d,m*g*R);const y=[R,R,R,R,R,R];x.set(y,f*g*R)}const U=new yn;U.setAttribute("position",new Nt(T,_)),U.setAttribute("uv",new Nt(E,m)),U.setAttribute("faceIndex",new Nt(x,f)),e.push(U),s>Yi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function mc(i,e,t){const n=new xi(i,e,t);return n.texture.mapping=Ja,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _a(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function pg(i,e,t){const n=new Float32Array(gi),s=new A(0,1,0);return new ai({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function gc(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function _c(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function il(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mg(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===no||l===io,h=l===ts||l===ns;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new pc(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new pc(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",a),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function gg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Ds("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function _g(i,e,t,n){const s={},a=new WeakMap;function r(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",r),delete s[d.id];const p=a.get(d);p&&(e.remove(p),a.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",r),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],i.ARRAY_BUFFER)}}function c(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const T=p.array;_=p.version;for(let E=0,x=T.length;E<x;E+=3){const U=T[E+0],R=T[E+1],w=T[E+2];d.push(U,R,R,w,w,U)}}else if(g!==void 0){const T=g.array;_=g.version;for(let E=0,x=T.length/3-1;E<x;E+=3){const U=E+0,R=E+1,w=E+2;d.push(U,R,R,w,w,U)}}else return;const m=new(eu(d)?au:su)(d,1);m.version=_;const f=a.get(u);f&&e.remove(f),a.set(u,m)}function h(u){const d=a.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return a.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function vg(i,e,t){let n;function s(d){n=d}let a,r;function o(d){a=d.type,r=d.bytesPerElement}function l(d,p){i.drawElements(n,p,a,d*r),t.update(p,n,1)}function c(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,a,d*r,g),t.update(p,n,g))}function h(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,a,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function u(d,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/r,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,a,d,0,_,0,g);let f=0;for(let T=0;T<g;T++)f+=p[T]*_[T];t.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,r,o){switch(t.calls++,r){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function yg(i,e,t){const n=new WeakMap,s=new Ye;function a(r,o,l){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let y=function(){N.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var p=y;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let U=o.attributes.position.count*x,R=1;U>e.maxTextureSize&&(R=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const w=new Float32Array(U*R*4*u),N=new nu(w,U,R,u);N.type=on,N.needsUpdate=!0;const M=x*4;for(let C=0;C<u;C++){const W=f[C],z=T[C],$=E[C],K=U*R*4*C;for(let j=0;j<W.count;j++){const J=j*M;g===!0&&(s.fromBufferAttribute(W,j),w[K+J+0]=s.x,w[K+J+1]=s.y,w[K+J+2]=s.z,w[K+J+3]=0),_===!0&&(s.fromBufferAttribute(z,j),w[K+J+4]=s.x,w[K+J+5]=s.y,w[K+J+6]=s.z,w[K+J+7]=0),m===!0&&(s.fromBufferAttribute($,j),w[K+J+8]=s.x,w[K+J+9]=s.y,w[K+J+10]=s.z,w[K+J+11]=$.itemSize===4?s.w:1)}}d={count:u,texture:N,size:new Ae(U,R)},n.set(o,d),o.addEventListener("dispose",y)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",r.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:a}}function xg(i,e,t,n){let s=new WeakMap;function a(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function r(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:r}}class hu extends Mt{constructor(e,t,n,s,a,r,o,l,c,h=Zi){if(h!==Zi&&h!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Zi&&(n=yi),n===void 0&&h===as&&(n=ss),super(null,s,a,r,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Dt,this.minFilter=l!==void 0?l:Dt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const uu=new Mt,vc=new hu(1,1),du=new nu,fu=new of,pu=new lu,bc=[],yc=[],xc=new Float32Array(16),Mc=new Float32Array(9),Sc=new Float32Array(4);function ps(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let a=bc[s];if(a===void 0&&(a=new Float32Array(s),bc[s]=a),e!==0){n.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,i[r].toArray(a,o)}return a}function _t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function tr(i,e){let t=yc[e];t===void 0&&(t=new Int32Array(e),yc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Mg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2fv(this.addr,e),vt(t,e)}}function Tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;i.uniform3fv(this.addr,e),vt(t,e)}}function Eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4fv(this.addr,e),vt(t,e)}}function wg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Sc.set(n),i.uniformMatrix2fv(this.addr,!1,Sc),vt(t,n)}}function Ag(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Mc.set(n),i.uniformMatrix3fv(this.addr,!1,Mc),vt(t,n)}}function Rg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;xc.set(n),i.uniformMatrix4fv(this.addr,!1,xc),vt(t,n)}}function Cg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2iv(this.addr,e),vt(t,e)}}function Pg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3iv(this.addr,e),vt(t,e)}}function Ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4iv(this.addr,e),vt(t,e)}}function Dg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2uiv(this.addr,e),vt(t,e)}}function Ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3uiv(this.addr,e),vt(t,e)}}function Og(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4uiv(this.addr,e),vt(t,e)}}function Fg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let a;this.type===i.SAMPLER_2D_SHADOW?(vc.compareFunction=Qh,a=vc):a=uu,t.setTexture2D(e||a,s)}function kg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||fu,s)}function Bg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||pu,s)}function zg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||du,s)}function Hg(i){switch(i){case 5126:return Mg;case 35664:return Sg;case 35665:return Tg;case 35666:return Eg;case 35674:return wg;case 35675:return Ag;case 35676:return Rg;case 5124:case 35670:return Cg;case 35667:case 35671:return Lg;case 35668:case 35672:return Pg;case 35669:case 35673:return Ig;case 5125:return Dg;case 36294:return Ng;case 36295:return Ug;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Fg;case 35679:case 36299:case 36307:return kg;case 35680:case 36300:case 36308:case 36293:return Bg;case 36289:case 36303:case 36311:case 36292:return zg}}function Vg(i,e){i.uniform1fv(this.addr,e)}function Gg(i,e){const t=ps(e,this.size,2);i.uniform2fv(this.addr,t)}function Wg(i,e){const t=ps(e,this.size,3);i.uniform3fv(this.addr,t)}function Xg(i,e){const t=ps(e,this.size,4);i.uniform4fv(this.addr,t)}function jg(i,e){const t=ps(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function qg(i,e){const t=ps(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Yg(i,e){const t=ps(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function $g(i,e){i.uniform1iv(this.addr,e)}function Kg(i,e){i.uniform2iv(this.addr,e)}function Zg(i,e){i.uniform3iv(this.addr,e)}function Jg(i,e){i.uniform4iv(this.addr,e)}function Qg(i,e){i.uniform1uiv(this.addr,e)}function e_(i,e){i.uniform2uiv(this.addr,e)}function t_(i,e){i.uniform3uiv(this.addr,e)}function n_(i,e){i.uniform4uiv(this.addr,e)}function i_(i,e,t){const n=this.cache,s=e.length,a=tr(t,s);_t(n,a)||(i.uniform1iv(this.addr,a),vt(n,a));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||uu,a[r])}function s_(i,e,t){const n=this.cache,s=e.length,a=tr(t,s);_t(n,a)||(i.uniform1iv(this.addr,a),vt(n,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||fu,a[r])}function a_(i,e,t){const n=this.cache,s=e.length,a=tr(t,s);_t(n,a)||(i.uniform1iv(this.addr,a),vt(n,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||pu,a[r])}function r_(i,e,t){const n=this.cache,s=e.length,a=tr(t,s);_t(n,a)||(i.uniform1iv(this.addr,a),vt(n,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||du,a[r])}function o_(i){switch(i){case 5126:return Vg;case 35664:return Gg;case 35665:return Wg;case 35666:return Xg;case 35674:return jg;case 35675:return qg;case 35676:return Yg;case 5124:case 35670:return $g;case 35667:case 35671:return Kg;case 35668:case 35672:return Zg;case 35669:case 35673:return Jg;case 5125:return Qg;case 36294:return e_;case 36295:return t_;case 36296:return n_;case 35678:case 36198:case 36298:case 36306:case 35682:return i_;case 35679:case 36299:case 36307:return s_;case 35680:case 36300:case 36308:case 36293:return a_;case 36289:case 36303:case 36311:case 36292:return r_}}class l_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Hg(t.type)}}class c_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=o_(t.type)}}class h_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],n)}}}const Dr=/(\w+)(\])?(\[|\.)?/g;function Tc(i,e){i.seq.push(e),i.map[e.id]=e}function u_(i,e,t){const n=i.name,s=n.length;for(Dr.lastIndex=0;;){const a=Dr.exec(n),r=Dr.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){Tc(t,c===void 0?new l_(o,i,e):new c_(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new h_(o),Tc(t,u)),t=u}}}class Ba{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const a=e.getActiveUniform(t,s),r=e.getUniformLocation(t,a.name);u_(a,r,this)}}setValue(e,t,n,s){const a=this.map[t];a!==void 0&&a.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&n.push(r)}return n}}function Ec(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const d_=37297;let f_=0;function p_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;n.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return n.join(`
`)}const wc=new Ue;function m_(i){He._getMatrix(wc,He.workingColorSpace,i);const e=`mat3( ${wc.elements.map(t=>t.toFixed(4))} )`;switch(He.getTransfer(i)){case Qa:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ac(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const r=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+p_(i.getShaderSource(e),r)}else return s}function g_(i,e){const t=m_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function __(i,e){let t;switch(e){case _d:t="Linear";break;case vd:t="Reinhard";break;case bd:t="Cineon";break;case Bh:t="ACESFilmic";break;case xd:t="AgX";break;case Md:t="Neutral";break;case yd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const va=new A;function v_(){He.getLuminanceCoefficients(va);const i=va.x.toFixed(4),e=va.y.toFixed(4),t=va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function b_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ns).join(`
`)}function y_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function x_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const a=i.getActiveAttrib(e,s),r=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:i.getAttribLocation(e,r),locationSize:o}}return t}function Ns(i){return i!==""}function Rc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const M_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(i){return i.replace(M_,T_)}const S_=new Map;function T_(i,e){let t=Fe[e];if(t===void 0){const n=S_.get(e);if(n!==void 0)t=Fe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Do(t)}const E_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lc(i){return i.replace(E_,w_)}function w_(i,e,t,n){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Pc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function A_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Fh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ku?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Pn&&(e="SHADOWMAP_TYPE_VSM"),e}function R_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ts:case ns:e="ENVMAP_TYPE_CUBE";break;case Ja:e="ENVMAP_TYPE_CUBE_UV";break}return e}function C_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ns:e="ENVMAP_MODE_REFRACTION";break}return e}function L_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case kh:e="ENVMAP_BLENDING_MULTIPLY";break;case md:e="ENVMAP_BLENDING_MIX";break;case gd:e="ENVMAP_BLENDING_ADD";break}return e}function P_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function I_(i,e,t,n){const s=i.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=A_(t),c=R_(t),h=C_(t),u=L_(t),d=P_(t),p=b_(t),g=y_(a),_=s.createProgram();let m,f,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ns).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ns).join(`
`),f.length>0&&(f+=`
`)):(m=[Pc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ns).join(`
`),f=[Pc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?Fe.tonemapping_pars_fragment:"",t.toneMapping!==ii?__("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,g_("linearToOutputTexel",t.outputColorSpace),v_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ns).join(`
`)),r=Do(r),r=Rc(r,t),r=Cc(r,t),o=Do(o),o=Rc(o,t),o=Cc(o,t),r=Lc(r),o=Lc(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=T+m+r,x=T+f+o,U=Ec(s,s.VERTEX_SHADER,E),R=Ec(s,s.FRAGMENT_SHADER,x);s.attachShader(_,U),s.attachShader(_,R),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(C){if(i.debug.checkShaderErrors){const W=s.getProgramInfoLog(_).trim(),z=s.getShaderInfoLog(U).trim(),$=s.getShaderInfoLog(R).trim();let K=!0,j=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,U,R);else{const J=Ac(s,U,"vertex"),V=Ac(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+W+`
`+J+`
`+V)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(z===""||$==="")&&(j=!1);j&&(C.diagnostics={runnable:K,programLog:W,vertexShader:{log:z,prefix:m},fragmentShader:{log:$,prefix:f}})}s.deleteShader(U),s.deleteShader(R),N=new Ba(s,_),M=x_(s,_)}let N;this.getUniforms=function(){return N===void 0&&w(this),N};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,d_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=f_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=U,this.fragmentShader=R,this}let D_=0;class N_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new U_(e),t.set(e,n)),n}}class U_{constructor(e){this.id=D_++,this.code=e,this.usedTimes=0}}function O_(i,e,t,n,s,a,r){const o=new el,l=new N_,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,y,C,W,z){const $=W.fog,K=z.geometry,j=M.isMeshStandardMaterial?W.environment:null,J=(M.isMeshStandardMaterial?t:e).get(M.envMap||j),V=J&&J.mapping===Ja?J.image.height:null,ae=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const ue=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,xe=ue!==void 0?ue.length:0;let ke=0;K.morphAttributes.position!==void 0&&(ke=1),K.morphAttributes.normal!==void 0&&(ke=2),K.morphAttributes.color!==void 0&&(ke=3);let nt,X,te,ve;if(ae){const Ze=fn[ae];nt=Ze.vertexShader,X=Ze.fragmentShader}else nt=M.vertexShader,X=M.fragmentShader,l.update(M),te=l.getVertexShaderID(M),ve=l.getFragmentShaderID(M);const re=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Pe=z.isInstancedMesh===!0,Be=z.isBatchedMesh===!0,ht=!!M.map,Xe=!!M.matcap,dt=!!J,D=!!M.aoMap,qt=!!M.lightMap,Ve=!!M.bumpMap,Ge=!!M.normalMap,Se=!!M.displacementMap,rt=!!M.emissiveMap,Me=!!M.metalnessMap,S=!!M.roughnessMap,v=M.anisotropy>0,O=M.clearcoat>0,q=M.dispersion>0,Z=M.iridescence>0,G=M.sheen>0,be=M.transmission>0,oe=v&&!!M.anisotropyMap,de=O&&!!M.clearcoatMap,je=O&&!!M.clearcoatNormalMap,Q=O&&!!M.clearcoatRoughnessMap,fe=Z&&!!M.iridescenceMap,Te=Z&&!!M.iridescenceThicknessMap,Re=G&&!!M.sheenColorMap,pe=G&&!!M.sheenRoughnessMap,We=!!M.specularMap,Oe=!!M.specularColorMap,st=!!M.specularIntensityMap,L=be&&!!M.transmissionMap,se=be&&!!M.thicknessMap,H=!!M.gradientMap,Y=!!M.alphaMap,he=M.alphaTest>0,le=!!M.alphaHash,De=!!M.extensions;let ut=ii;M.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ut=i.toneMapping);const Tt={shaderID:ae,shaderType:M.type,shaderName:M.name,vertexShader:nt,fragmentShader:X,defines:M.defines,customVertexShaderID:te,customFragmentShaderID:ve,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Be,batchingColor:Be&&z._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&z.instanceColor!==null,instancingMorph:Pe&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Ut,alphaToCoverage:!!M.alphaToCoverage,map:ht,matcap:Xe,envMap:dt,envMapMode:dt&&J.mapping,envMapCubeUVHeight:V,aoMap:D,lightMap:qt,bumpMap:Ve,normalMap:Ge,displacementMap:d&&Se,emissiveMap:rt,normalMapObjectSpace:Ge&&M.normalMapType===Rd,normalMapTangentSpace:Ge&&M.normalMapType===Jh,metalnessMap:Me,roughnessMap:S,anisotropy:v,anisotropyMap:oe,clearcoat:O,clearcoatMap:de,clearcoatNormalMap:je,clearcoatRoughnessMap:Q,dispersion:q,iridescence:Z,iridescenceMap:fe,iridescenceThicknessMap:Te,sheen:G,sheenColorMap:Re,sheenRoughnessMap:pe,specularMap:We,specularColorMap:Oe,specularIntensityMap:st,transmission:be,transmissionMap:L,thicknessMap:se,gradientMap:H,opaque:M.transparent===!1&&M.blending===Ki&&M.alphaToCoverage===!1,alphaMap:Y,alphaTest:he,alphaHash:le,combine:M.combine,mapUv:ht&&_(M.map.channel),aoMapUv:D&&_(M.aoMap.channel),lightMapUv:qt&&_(M.lightMap.channel),bumpMapUv:Ve&&_(M.bumpMap.channel),normalMapUv:Ge&&_(M.normalMap.channel),displacementMapUv:Se&&_(M.displacementMap.channel),emissiveMapUv:rt&&_(M.emissiveMap.channel),metalnessMapUv:Me&&_(M.metalnessMap.channel),roughnessMapUv:S&&_(M.roughnessMap.channel),anisotropyMapUv:oe&&_(M.anisotropyMap.channel),clearcoatMapUv:de&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:je&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:pe&&_(M.sheenRoughnessMap.channel),specularMapUv:We&&_(M.specularMap.channel),specularColorMapUv:Oe&&_(M.specularColorMap.channel),specularIntensityMapUv:st&&_(M.specularIntensityMap.channel),transmissionMapUv:L&&_(M.transmissionMap.channel),thicknessMapUv:se&&_(M.thicknessMap.channel),alphaMapUv:Y&&_(M.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Ge||v),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!K.attributes.uv&&(ht||Y),fog:!!$,useFog:M.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:we,skinning:z.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:ke,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ut,decodeVideoTexture:ht&&M.map.isVideoTexture===!0&&He.getTransfer(M.map.colorSpace)===et,decodeVideoTextureEmissive:rt&&M.emissiveMap.isVideoTexture===!0&&He.getTransfer(M.emissiveMap.colorSpace)===et,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===sn,flipSided:M.side===zt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:De&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&M.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Tt.vertexUv1s=c.has(1),Tt.vertexUv2s=c.has(2),Tt.vertexUv3s=c.has(3),c.clear(),Tt}function f(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)y.push(C),y.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(T(y,M),E(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function T(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function E(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),M.push(o.mask)}function x(M){const y=g[M.type];let C;if(y){const W=fn[y];C=bf.clone(W.uniforms)}else C=M.uniforms;return C}function U(M,y){let C;for(let W=0,z=h.length;W<z;W++){const $=h[W];if($.cacheKey===y){C=$,++C.usedTimes;break}}return C===void 0&&(C=new I_(i,y,M,a),h.push(C)),C}function R(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function w(M){l.remove(M)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:U,releaseProgram:R,releaseShaderCache:w,programs:h,dispose:N}}function F_(){let i=new WeakMap;function e(r){return i.has(r)}function t(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function n(r){i.delete(r)}function s(r,o,l){i.get(r)[o]=l}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:a}}function k_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ic(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Dc(){const i=[];let e=0;const t=[],n=[],s=[];function a(){e=0,t.length=0,n.length=0,s.length=0}function r(u,d,p,g,_,m){let f=i[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function o(u,d,p,g,_,m){const f=r(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(u,d,p,g,_,m){const f=r(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(u,d){t.length>1&&t.sort(u||k_),n.length>1&&n.sort(d||Ic),s.length>1&&s.sort(d||Ic)}function h(){for(let u=e,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:a,push:o,unshift:l,finish:h,sort:c}}function B_(){let i=new WeakMap;function e(n,s){const a=i.get(n);let r;return a===void 0?(r=new Dc,i.set(n,[r])):s>=a.length?(r=new Dc,a.push(r)):r=a[s],r}function t(){i=new WeakMap}return{get:e,dispose:t}}function z_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new Ee};break;case"SpotLight":t={position:new A,direction:new A,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":t={color:new Ee,position:new A,halfWidth:new A,halfHeight:new A};break}return i[e.id]=t,t}}}function H_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let V_=0;function G_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function W_(i){const e=new z_,t=H_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const s=new A,a=new Le,r=new Le;function o(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,T=0,E=0,x=0,U=0,R=0,w=0;c.sort(G_);for(let M=0,y=c.length;M<y;M++){const C=c[M],W=C.color,z=C.intensity,$=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=W.r*z,u+=W.g*z,d+=W.b*z;else if(C.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(C.sh.coefficients[j],z);w++}else if(C.isDirectionalLight){const j=e.get(C);if(j.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const J=C.shadow,V=t.get(C);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=C.shadow.matrix,T++}n.directional[p]=j,p++}else if(C.isSpotLight){const j=e.get(C);j.position.setFromMatrixPosition(C.matrixWorld),j.color.copy(W).multiplyScalar(z),j.distance=$,j.coneCos=Math.cos(C.angle),j.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),j.decay=C.decay,n.spot[_]=j;const J=C.shadow;if(C.map&&(n.spotLightMap[U]=C.map,U++,J.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[_]=J.matrix,C.castShadow){const V=t.get(C);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=K,x++}_++}else if(C.isRectAreaLight){const j=e.get(C);j.color.copy(W).multiplyScalar(z),j.halfWidth.set(C.width*.5,0,0),j.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=j,m++}else if(C.isPointLight){const j=e.get(C);if(j.color.copy(C.color).multiplyScalar(C.intensity),j.distance=C.distance,j.decay=C.decay,C.castShadow){const J=C.shadow,V=t.get(C);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=C.shadow.matrix,E++}n.point[g]=j,g++}else if(C.isHemisphereLight){const j=e.get(C);j.skyColor.copy(C.color).multiplyScalar(z),j.groundColor.copy(C.groundColor).multiplyScalar(z),n.hemi[f]=j,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ne.LTC_FLOAT_1,n.rectAreaLTC2=ne.LTC_FLOAT_2):(n.rectAreaLTC1=ne.LTC_HALF_1,n.rectAreaLTC2=ne.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const N=n.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==f||N.numDirectionalShadows!==T||N.numPointShadows!==E||N.numSpotShadows!==x||N.numSpotMaps!==U||N.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=x+U-R,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=w,N.directionalLength=p,N.pointLength=g,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=f,N.numDirectionalShadows=T,N.numPointShadows=E,N.numSpotShadows=x,N.numSpotMaps=U,N.numLightProbes=w,n.version=V_++)}function l(c,h){let u=0,d=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,T=c.length;f<T;f++){const E=c[f];if(E.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(E.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),r.identity(),a.copy(E.matrixWorld),a.premultiply(m),r.extractRotation(a),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(r),x.halfHeight.applyMatrix4(r),g++}else if(E.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function Nc(i){const e=new W_(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function a(h){t.push(h)}function r(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function X_(i){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new Nc(i),e.set(s,[o])):a>=r.length?(o=new Nc(i),r.push(o)):o=r[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class j_ extends mn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class q_ extends mn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Y_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function K_(i,e,t){let n=new tl;const s=new Ae,a=new Ae,r=new Ye,o=new j_({depthPacking:Ad}),l=new q_,c={},h=t.maxTextureSize,u={[kn]:zt,[zt]:kn,[sn]:sn},d=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:Y_,fragmentShader:$_}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new yn;g.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new xt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fh;let f=this.type;this.render=function(R,w,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const M=i.getRenderTarget(),y=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),W=i.state;W.setBlending(ni),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const z=f!==Pn&&this.type===Pn,$=f===Pn&&this.type!==Pn;for(let K=0,j=R.length;K<j;K++){const J=R[K],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const ae=V.getFrameExtents();if(s.multiply(ae),a.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/ae.x),s.x=a.x*ae.x,V.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/ae.y),s.y=a.y*ae.y,V.mapSize.y=a.y)),V.map===null||z===!0||$===!0){const xe=this.type!==Pn?{minFilter:Dt,magFilter:Dt}:{};V.map!==null&&V.map.dispose(),V.map=new xi(s.x,s.y,xe),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ue=V.getViewportCount();for(let xe=0;xe<ue;xe++){const ke=V.getViewport(xe);r.set(a.x*ke.x,a.y*ke.y,a.x*ke.z,a.y*ke.w),W.viewport(r),V.updateMatrices(J,xe),n=V.getFrustum(),x(w,N,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Pn&&T(V,N),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(M,y,C)};function T(R,w){const N=e.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new xi(s.x,s.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(w,null,N,d,_,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(w,null,N,p,_,null)}function E(R,w,N,M){let y=null;const C=N.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)y=C;else if(y=N.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const W=y.uuid,z=w.uuid;let $=c[W];$===void 0&&($={},c[W]=$);let K=$[z];K===void 0&&(K=y.clone(),$[z]=K,w.addEventListener("dispose",U)),y=K}if(y.visible=w.visible,y.wireframe=w.wireframe,M===Pn?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:u[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,N.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const W=i.properties.get(y);W.light=N}return y}function x(R,w,N,M,y){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===Pn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,R.matrixWorld);const z=e.update(R),$=R.material;if(Array.isArray($)){const K=z.groups;for(let j=0,J=K.length;j<J;j++){const V=K[j],ae=$[V.materialIndex];if(ae&&ae.visible){const ue=E(R,ae,M,y);R.onBeforeShadow(i,R,w,N,z,ue,V),i.renderBufferDirect(N,null,z,ue,R,V),R.onAfterShadow(i,R,w,N,z,ue,V)}}}else if($.visible){const K=E(R,$,M,y);R.onBeforeShadow(i,R,w,N,z,K,null),i.renderBufferDirect(N,null,z,K,R,null),R.onAfterShadow(i,R,w,N,z,K,null)}}const W=R.children;for(let z=0,$=W.length;z<$;z++)x(W[z],w,N,M,y)}function U(R){R.target.removeEventListener("dispose",U);for(const N in c){const M=c[N],y=R.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const Z_={[$r]:Kr,[Zr]:eo,[Jr]:to,[es]:Qr,[Kr]:$r,[eo]:Zr,[to]:Jr,[Qr]:es};function J_(i,e){function t(){let L=!1;const se=new Ye;let H=null;const Y=new Ye(0,0,0,0);return{setMask:function(he){H!==he&&!L&&(i.colorMask(he,he,he,he),H=he)},setLocked:function(he){L=he},setClear:function(he,le,De,ut,Tt){Tt===!0&&(he*=ut,le*=ut,De*=ut),se.set(he,le,De,ut),Y.equals(se)===!1&&(i.clearColor(he,le,De,ut),Y.copy(se))},reset:function(){L=!1,H=null,Y.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,H=null,Y=null,he=null;return{setReversed:function(le){if(se!==le){const De=e.get("EXT_clip_control");se?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);const ut=he;he=null,this.setClear(ut)}se=le},getReversed:function(){return se},setTest:function(le){le?re(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(le){H!==le&&!L&&(i.depthMask(le),H=le)},setFunc:function(le){if(se&&(le=Z_[le]),Y!==le){switch(le){case $r:i.depthFunc(i.NEVER);break;case Kr:i.depthFunc(i.ALWAYS);break;case Zr:i.depthFunc(i.LESS);break;case es:i.depthFunc(i.LEQUAL);break;case Jr:i.depthFunc(i.EQUAL);break;case Qr:i.depthFunc(i.GEQUAL);break;case eo:i.depthFunc(i.GREATER);break;case to:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Y=le}},setLocked:function(le){L=le},setClear:function(le){he!==le&&(se&&(le=1-le),i.clearDepth(le),he=le)},reset:function(){L=!1,H=null,Y=null,he=null,se=!1}}}function s(){let L=!1,se=null,H=null,Y=null,he=null,le=null,De=null,ut=null,Tt=null;return{setTest:function(Ze){L||(Ze?re(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(Ze){se!==Ze&&!L&&(i.stencilMask(Ze),se=Ze)},setFunc:function(Ze,Jt,Sn){(H!==Ze||Y!==Jt||he!==Sn)&&(i.stencilFunc(Ze,Jt,Sn),H=Ze,Y=Jt,he=Sn)},setOp:function(Ze,Jt,Sn){(le!==Ze||De!==Jt||ut!==Sn)&&(i.stencilOp(Ze,Jt,Sn),le=Ze,De=Jt,ut=Sn)},setLocked:function(Ze){L=Ze},setClear:function(Ze){Tt!==Ze&&(i.clearStencil(Ze),Tt=Ze)},reset:function(){L=!1,se=null,H=null,Y=null,he=null,le=null,De=null,ut=null,Tt=null}}}const a=new t,r=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,T=null,E=null,x=null,U=null,R=null,w=new Ee(0,0,0),N=0,M=!1,y=null,C=null,W=null,z=null,$=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,J=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),j=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),j=J>=2);let ae=null,ue={};const xe=i.getParameter(i.SCISSOR_BOX),ke=i.getParameter(i.VIEWPORT),nt=new Ye().fromArray(xe),X=new Ye().fromArray(ke);function te(L,se,H,Y){const he=new Uint8Array(4),le=i.createTexture();i.bindTexture(L,le),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<H;De++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,Y,0,i.RGBA,i.UNSIGNED_BYTE,he):i.texImage2D(se+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,he);return le}const ve={};ve[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),ve[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ve[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),re(i.DEPTH_TEST),r.setFunc(es),Ve(!1),Ge(Nl),re(i.CULL_FACE),D(ni);function re(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function we(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Pe(L,se){return u[L]!==se?(i.bindFramebuffer(L,se),u[L]=se,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Be(L,se){let H=p,Y=!1;if(L){H=d.get(se),H===void 0&&(H=[],d.set(se,H));const he=L.textures;if(H.length!==he.length||H[0]!==i.COLOR_ATTACHMENT0){for(let le=0,De=he.length;le<De;le++)H[le]=i.COLOR_ATTACHMENT0+le;H.length=he.length,Y=!0}}else H[0]!==i.BACK&&(H[0]=i.BACK,Y=!0);Y&&i.drawBuffers(H)}function ht(L){return g!==L?(i.useProgram(L),g=L,!0):!1}const Xe={[mi]:i.FUNC_ADD,[Ju]:i.FUNC_SUBTRACT,[Qu]:i.FUNC_REVERSE_SUBTRACT};Xe[ed]=i.MIN,Xe[td]=i.MAX;const dt={[nd]:i.ZERO,[id]:i.ONE,[sd]:i.SRC_COLOR,[qr]:i.SRC_ALPHA,[hd]:i.SRC_ALPHA_SATURATE,[ld]:i.DST_COLOR,[rd]:i.DST_ALPHA,[ad]:i.ONE_MINUS_SRC_COLOR,[Yr]:i.ONE_MINUS_SRC_ALPHA,[cd]:i.ONE_MINUS_DST_COLOR,[od]:i.ONE_MINUS_DST_ALPHA,[ud]:i.CONSTANT_COLOR,[dd]:i.ONE_MINUS_CONSTANT_COLOR,[fd]:i.CONSTANT_ALPHA,[pd]:i.ONE_MINUS_CONSTANT_ALPHA};function D(L,se,H,Y,he,le,De,ut,Tt,Ze){if(L===ni){_===!0&&(we(i.BLEND),_=!1);return}if(_===!1&&(re(i.BLEND),_=!0),L!==Zu){if(L!==m||Ze!==M){if((f!==mi||x!==mi)&&(i.blendEquation(i.FUNC_ADD),f=mi,x=mi),Ze)switch(L){case Ki:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ul:i.blendFunc(i.ONE,i.ONE);break;case Ol:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ul:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ol:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}T=null,E=null,U=null,R=null,w.set(0,0,0),N=0,m=L,M=Ze}return}he=he||se,le=le||H,De=De||Y,(se!==f||he!==x)&&(i.blendEquationSeparate(Xe[se],Xe[he]),f=se,x=he),(H!==T||Y!==E||le!==U||De!==R)&&(i.blendFuncSeparate(dt[H],dt[Y],dt[le],dt[De]),T=H,E=Y,U=le,R=De),(ut.equals(w)===!1||Tt!==N)&&(i.blendColor(ut.r,ut.g,ut.b,Tt),w.copy(ut),N=Tt),m=L,M=!1}function qt(L,se){L.side===sn?we(i.CULL_FACE):re(i.CULL_FACE);let H=L.side===zt;se&&(H=!H),Ve(H),L.blending===Ki&&L.transparent===!1?D(ni):D(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),a.setMask(L.colorWrite);const Y=L.stencilWrite;o.setTest(Y),Y&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),rt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(L){y!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),y=L)}function Ge(L){L!==Yu?(re(i.CULL_FACE),L!==C&&(L===Nl?i.cullFace(i.BACK):L===$u?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),C=L}function Se(L){L!==W&&(j&&i.lineWidth(L),W=L)}function rt(L,se,H){L?(re(i.POLYGON_OFFSET_FILL),(z!==se||$!==H)&&(i.polygonOffset(se,H),z=se,$=H)):we(i.POLYGON_OFFSET_FILL)}function Me(L){L?re(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function S(L){L===void 0&&(L=i.TEXTURE0+K-1),ae!==L&&(i.activeTexture(L),ae=L)}function v(L,se,H){H===void 0&&(ae===null?H=i.TEXTURE0+K-1:H=ae);let Y=ue[H];Y===void 0&&(Y={type:void 0,texture:void 0},ue[H]=Y),(Y.type!==L||Y.texture!==se)&&(ae!==H&&(i.activeTexture(H),ae=H),i.bindTexture(L,se||ve[L]),Y.type=L,Y.texture=se)}function O(){const L=ue[ae];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function G(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function oe(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function je(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(L){nt.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),nt.copy(L))}function pe(L){X.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),X.copy(L))}function We(L,se){let H=c.get(se);H===void 0&&(H=new WeakMap,c.set(se,H));let Y=H.get(L);Y===void 0&&(Y=i.getUniformBlockIndex(se,L.name),H.set(L,Y))}function Oe(L,se){const Y=c.get(se).get(L);l.get(se)!==Y&&(i.uniformBlockBinding(se,Y,L.__bindingPointIndex),l.set(se,Y))}function st(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ae=null,ue={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,T=null,E=null,x=null,U=null,R=null,w=new Ee(0,0,0),N=0,M=!1,y=null,C=null,W=null,z=null,$=null,nt.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:re,disable:we,bindFramebuffer:Pe,drawBuffers:Be,useProgram:ht,setBlending:D,setMaterial:qt,setFlipSided:Ve,setCullFace:Ge,setLineWidth:Se,setPolygonOffset:rt,setScissorTest:Me,activeTexture:S,bindTexture:v,unbindTexture:O,compressedTexImage2D:q,compressedTexImage3D:Z,texImage2D:fe,texImage3D:Te,updateUBOMapping:We,uniformBlockBinding:Oe,texStorage2D:je,texStorage3D:Q,texSubImage2D:G,texSubImage3D:be,compressedTexSubImage2D:oe,compressedTexSubImage3D:de,scissor:Re,viewport:pe,reset:st}}function Uc(i,e,t,n){const s=Q_(n);switch(t){case Xh:return i*e;case qh:return i*e;case Yh:return i*e*2;case $o:return i*e/s.components*s.byteLength;case Ko:return i*e/s.components*s.byteLength;case $h:return i*e*2/s.components*s.byteLength;case Zo:return i*e*2/s.components*s.byteLength;case jh:return i*e*3/s.components*s.byteLength;case Zt:return i*e*4/s.components*s.byteLength;case Jo:return i*e*4/s.components*s.byteLength;case Na:case Ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Oa:case Fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ao:case oo:return Math.max(i,16)*Math.max(e,8)/4;case so:case ro:return Math.max(i,8)*Math.max(e,8)/2;case lo:case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ho:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case po:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case mo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case go:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case _o:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case vo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case yo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case xo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case So:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case To:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ka:case wo:case Ao:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Kh:case Ro:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Co:case Lo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Q_(i){switch(i){case Bn:case Vh:return{byteLength:1,components:1};case Vs:case Gh:case qs:return{byteLength:2,components:1};case qo:case Yo:return{byteLength:2,components:4};case yi:case jo:case on:return{byteLength:4,components:1};case Wh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function ev(i,e,t,n,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ae,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,v){return p?new OffscreenCanvas(S,v):Xs("canvas")}function _(S,v,O){let q=1;const Z=Me(S);if((Z.width>O||Z.height>O)&&(q=O/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const G=Math.floor(q*Z.width),be=Math.floor(q*Z.height);u===void 0&&(u=g(G,be));const oe=v?g(G,be):u;return oe.width=G,oe.height=be,oe.getContext("2d").drawImage(S,0,0,G,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+G+"x"+be+")."),oe}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),S;return S}function m(S){return S.generateMipmaps}function f(S){i.generateMipmap(S)}function T(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(S,v,O,q,Z=!1){if(S!==null){if(i[S]!==void 0)return i[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let G=v;if(v===i.RED&&(O===i.FLOAT&&(G=i.R32F),O===i.HALF_FLOAT&&(G=i.R16F),O===i.UNSIGNED_BYTE&&(G=i.R8)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(G=i.R8UI),O===i.UNSIGNED_SHORT&&(G=i.R16UI),O===i.UNSIGNED_INT&&(G=i.R32UI),O===i.BYTE&&(G=i.R8I),O===i.SHORT&&(G=i.R16I),O===i.INT&&(G=i.R32I)),v===i.RG&&(O===i.FLOAT&&(G=i.RG32F),O===i.HALF_FLOAT&&(G=i.RG16F),O===i.UNSIGNED_BYTE&&(G=i.RG8)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(G=i.RG8UI),O===i.UNSIGNED_SHORT&&(G=i.RG16UI),O===i.UNSIGNED_INT&&(G=i.RG32UI),O===i.BYTE&&(G=i.RG8I),O===i.SHORT&&(G=i.RG16I),O===i.INT&&(G=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(G=i.RGB8UI),O===i.UNSIGNED_SHORT&&(G=i.RGB16UI),O===i.UNSIGNED_INT&&(G=i.RGB32UI),O===i.BYTE&&(G=i.RGB8I),O===i.SHORT&&(G=i.RGB16I),O===i.INT&&(G=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),O===i.UNSIGNED_INT&&(G=i.RGBA32UI),O===i.BYTE&&(G=i.RGBA8I),O===i.SHORT&&(G=i.RGBA16I),O===i.INT&&(G=i.RGBA32I)),v===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),v===i.RGBA){const be=Z?Qa:He.getTransfer(q);O===i.FLOAT&&(G=i.RGBA32F),O===i.HALF_FLOAT&&(G=i.RGBA16F),O===i.UNSIGNED_BYTE&&(G=be===et?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function x(S,v){let O;return S?v===null||v===yi||v===ss?O=i.DEPTH24_STENCIL8:v===on?O=i.DEPTH32F_STENCIL8:v===Vs&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===yi||v===ss?O=i.DEPTH_COMPONENT24:v===on?O=i.DEPTH_COMPONENT32F:v===Vs&&(O=i.DEPTH_COMPONENT16),O}function U(S,v){return m(S)===!0||S.isFramebufferTexture&&S.minFilter!==Dt&&S.minFilter!==Wt?Math.log2(Math.max(v.width,v.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?v.mipmaps.length:1}function R(S){const v=S.target;v.removeEventListener("dispose",R),N(v),v.isVideoTexture&&h.delete(v)}function w(S){const v=S.target;v.removeEventListener("dispose",w),y(v)}function N(S){const v=n.get(S);if(v.__webglInit===void 0)return;const O=S.source,q=d.get(O);if(q){const Z=q[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&M(S),Object.keys(q).length===0&&d.delete(O)}n.remove(S)}function M(S){const v=n.get(S);i.deleteTexture(v.__webglTexture);const O=S.source,q=d.get(O);delete q[v.__cacheKey],r.memory.textures--}function y(S){const v=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let Z=0;Z<v.__webglFramebuffer[q].length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[q][Z]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=S.textures;for(let q=0,Z=O.length;q<Z;q++){const G=n.get(O[q]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),r.memory.textures--),n.remove(O[q])}n.remove(S)}let C=0;function W(){C=0}function z(){const S=C;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),C+=1,S}function $(S){const v=[];return v.push(S.wrapS),v.push(S.wrapT),v.push(S.wrapR||0),v.push(S.magFilter),v.push(S.minFilter),v.push(S.anisotropy),v.push(S.internalFormat),v.push(S.format),v.push(S.type),v.push(S.generateMipmaps),v.push(S.premultiplyAlpha),v.push(S.flipY),v.push(S.unpackAlignment),v.push(S.colorSpace),v.join()}function K(S,v){const O=n.get(S);if(S.isVideoTexture&&Se(S),S.isRenderTargetTexture===!1&&S.version>0&&O.__version!==S.version){const q=S.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(O,S,v);return}}t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function j(S,v){const O=n.get(S);if(S.version>0&&O.__version!==S.version){X(O,S,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function J(S,v){const O=n.get(S);if(S.version>0&&O.__version!==S.version){X(O,S,v);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function V(S,v){const O=n.get(S);if(S.version>0&&O.__version!==S.version){te(O,S,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const ae={[is]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[Va]:i.MIRRORED_REPEAT},ue={[Dt]:i.NEAREST,[Hh]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[Wt]:i.LINEAR,[Da]:i.LINEAR_MIPMAP_NEAREST,[Dn]:i.LINEAR_MIPMAP_LINEAR},xe={[Cd]:i.NEVER,[Ud]:i.ALWAYS,[Ld]:i.LESS,[Qh]:i.LEQUAL,[Pd]:i.EQUAL,[Nd]:i.GEQUAL,[Id]:i.GREATER,[Dd]:i.NOTEQUAL};function ke(S,v){if(v.type===on&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Wt||v.magFilter===Da||v.magFilter===Is||v.magFilter===Dn||v.minFilter===Wt||v.minFilter===Da||v.minFilter===Is||v.minFilter===Dn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,ae[v.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,ae[v.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,ae[v.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,ue[v.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,ue[v.minFilter]),v.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,xe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Dt||v.minFilter!==Is&&v.minFilter!==Dn||v.type===on&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(S,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function nt(S,v){let O=!1;S.__webglInit===void 0&&(S.__webglInit=!0,v.addEventListener("dispose",R));const q=v.source;let Z=d.get(q);Z===void 0&&(Z={},d.set(q,Z));const G=$(v);if(G!==S.__cacheKey){Z[G]===void 0&&(Z[G]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,O=!0),Z[G].usedTimes++;const be=Z[S.__cacheKey];be!==void 0&&(Z[S.__cacheKey].usedTimes--,be.usedTimes===0&&M(v)),S.__cacheKey=G,S.__webglTexture=Z[G].texture}return O}function X(S,v,O){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);const Z=nt(S,v),G=v.source;t.bindTexture(q,S.__webglTexture,i.TEXTURE0+O);const be=n.get(G);if(G.version!==be.__version||Z===!0){t.activeTexture(i.TEXTURE0+O);const oe=He.getPrimaries(He.workingColorSpace),de=v.colorSpace===Zn?null:He.getPrimaries(v.colorSpace),je=v.colorSpace===Zn||oe===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,je);let Q=_(v.image,!1,s.maxTextureSize);Q=rt(v,Q);const fe=a.convert(v.format,v.colorSpace),Te=a.convert(v.type);let Re=E(v.internalFormat,fe,Te,v.colorSpace,v.isVideoTexture);ke(q,v);let pe;const We=v.mipmaps,Oe=v.isVideoTexture!==!0,st=be.__version===void 0||Z===!0,L=G.dataReady,se=U(v,Q);if(v.isDepthTexture)Re=x(v.format===as,v.type),st&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,Re,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,Re,Q.width,Q.height,0,fe,Te,null));else if(v.isDataTexture)if(We.length>0){Oe&&st&&t.texStorage2D(i.TEXTURE_2D,se,Re,We[0].width,We[0].height);for(let H=0,Y=We.length;H<Y;H++)pe=We[H],Oe?L&&t.texSubImage2D(i.TEXTURE_2D,H,0,0,pe.width,pe.height,fe,Te,pe.data):t.texImage2D(i.TEXTURE_2D,H,Re,pe.width,pe.height,0,fe,Te,pe.data);v.generateMipmaps=!1}else Oe?(st&&t.texStorage2D(i.TEXTURE_2D,se,Re,Q.width,Q.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,fe,Te,Q.data)):t.texImage2D(i.TEXTURE_2D,0,Re,Q.width,Q.height,0,fe,Te,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Oe&&st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,Re,We[0].width,We[0].height,Q.depth);for(let H=0,Y=We.length;H<Y;H++)if(pe=We[H],v.format!==Zt)if(fe!==null)if(Oe){if(L)if(v.layerUpdates.size>0){const he=Uc(pe.width,pe.height,v.format,v.type);for(const le of v.layerUpdates){const De=pe.data.subarray(le*he/pe.data.BYTES_PER_ELEMENT,(le+1)*he/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,le,pe.width,pe.height,1,fe,De)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,0,pe.width,pe.height,Q.depth,fe,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,H,Re,pe.width,pe.height,Q.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,0,pe.width,pe.height,Q.depth,fe,Te,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,H,Re,pe.width,pe.height,Q.depth,0,fe,Te,pe.data)}else{Oe&&st&&t.texStorage2D(i.TEXTURE_2D,se,Re,We[0].width,We[0].height);for(let H=0,Y=We.length;H<Y;H++)pe=We[H],v.format!==Zt?fe!==null?Oe?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,H,0,0,pe.width,pe.height,fe,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,H,Re,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?L&&t.texSubImage2D(i.TEXTURE_2D,H,0,0,pe.width,pe.height,fe,Te,pe.data):t.texImage2D(i.TEXTURE_2D,H,Re,pe.width,pe.height,0,fe,Te,pe.data)}else if(v.isDataArrayTexture)if(Oe){if(st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,Re,Q.width,Q.height,Q.depth),L)if(v.layerUpdates.size>0){const H=Uc(Q.width,Q.height,v.format,v.type);for(const Y of v.layerUpdates){const he=Q.data.subarray(Y*H/Q.data.BYTES_PER_ELEMENT,(Y+1)*H/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Y,Q.width,Q.height,1,fe,Te,he)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,fe,Te,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,Q.width,Q.height,Q.depth,0,fe,Te,Q.data);else if(v.isData3DTexture)Oe?(st&&t.texStorage3D(i.TEXTURE_3D,se,Re,Q.width,Q.height,Q.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,fe,Te,Q.data)):t.texImage3D(i.TEXTURE_3D,0,Re,Q.width,Q.height,Q.depth,0,fe,Te,Q.data);else if(v.isFramebufferTexture){if(st)if(Oe)t.texStorage2D(i.TEXTURE_2D,se,Re,Q.width,Q.height);else{let H=Q.width,Y=Q.height;for(let he=0;he<se;he++)t.texImage2D(i.TEXTURE_2D,he,Re,H,Y,0,fe,Te,null),H>>=1,Y>>=1}}else if(We.length>0){if(Oe&&st){const H=Me(We[0]);t.texStorage2D(i.TEXTURE_2D,se,Re,H.width,H.height)}for(let H=0,Y=We.length;H<Y;H++)pe=We[H],Oe?L&&t.texSubImage2D(i.TEXTURE_2D,H,0,0,fe,Te,pe):t.texImage2D(i.TEXTURE_2D,H,Re,fe,Te,pe);v.generateMipmaps=!1}else if(Oe){if(st){const H=Me(Q);t.texStorage2D(i.TEXTURE_2D,se,Re,H.width,H.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Te,Q)}else t.texImage2D(i.TEXTURE_2D,0,Re,fe,Te,Q);m(v)&&f(q),be.__version=G.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function te(S,v,O){if(v.image.length!==6)return;const q=nt(S,v),Z=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+O);const G=n.get(Z);if(Z.version!==G.__version||q===!0){t.activeTexture(i.TEXTURE0+O);const be=He.getPrimaries(He.workingColorSpace),oe=v.colorSpace===Zn?null:He.getPrimaries(v.colorSpace),de=v.colorSpace===Zn||be===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const je=v.isCompressedTexture||v.image[0].isCompressedTexture,Q=v.image[0]&&v.image[0].isDataTexture,fe=[];for(let Y=0;Y<6;Y++)!je&&!Q?fe[Y]=_(v.image[Y],!0,s.maxCubemapSize):fe[Y]=Q?v.image[Y].image:v.image[Y],fe[Y]=rt(v,fe[Y]);const Te=fe[0],Re=a.convert(v.format,v.colorSpace),pe=a.convert(v.type),We=E(v.internalFormat,Re,pe,v.colorSpace),Oe=v.isVideoTexture!==!0,st=G.__version===void 0||q===!0,L=Z.dataReady;let se=U(v,Te);ke(i.TEXTURE_CUBE_MAP,v);let H;if(je){Oe&&st&&t.texStorage2D(i.TEXTURE_CUBE_MAP,se,We,Te.width,Te.height);for(let Y=0;Y<6;Y++){H=fe[Y].mipmaps;for(let he=0;he<H.length;he++){const le=H[he];v.format!==Zt?Re!==null?Oe?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,le.width,le.height,Re,le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,We,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,le.width,le.height,Re,pe,le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,We,le.width,le.height,0,Re,pe,le.data)}}}else{if(H=v.mipmaps,Oe&&st){H.length>0&&se++;const Y=Me(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,se,We,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(Q){Oe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,fe[Y].width,fe[Y].height,Re,pe,fe[Y].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,We,fe[Y].width,fe[Y].height,0,Re,pe,fe[Y].data);for(let he=0;he<H.length;he++){const De=H[he].image[Y].image;Oe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,De.width,De.height,Re,pe,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,We,De.width,De.height,0,Re,pe,De.data)}}else{Oe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Re,pe,fe[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,We,Re,pe,fe[Y]);for(let he=0;he<H.length;he++){const le=H[he];Oe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,Re,pe,le.image[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,We,Re,pe,le.image[Y])}}}m(v)&&f(i.TEXTURE_CUBE_MAP),G.__version=Z.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function ve(S,v,O,q,Z,G){const be=a.convert(O.format,O.colorSpace),oe=a.convert(O.type),de=E(O.internalFormat,be,oe,O.colorSpace),je=n.get(v),Q=n.get(O);if(Q.__renderTarget=v,!je.__hasExternalTextures){const fe=Math.max(1,v.width>>G),Te=Math.max(1,v.height>>G);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,G,de,fe,Te,v.depth,0,be,oe,null):t.texImage2D(Z,G,de,fe,Te,0,be,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),Ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Z,Q.__webglTexture,0,Ve(v)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Z,Q.__webglTexture,G),t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(S,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,S),v.depthBuffer){const q=v.depthTexture,Z=q&&q.isDepthTexture?q.type:null,G=x(v.stencilBuffer,Z),be=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=Ve(v);Ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,G,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,G,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,G,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,S)}else{const q=v.textures;for(let Z=0;Z<q.length;Z++){const G=q[Z],be=a.convert(G.format,G.colorSpace),oe=a.convert(G.type),de=E(G.internalFormat,be,oe,G.colorSpace),je=Ve(v);O&&Ge(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,je,de,v.width,v.height):Ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,je,de,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,de,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(S,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const Z=q.__webglTexture,G=Ve(v);if(v.depthTexture.format===Zi)Ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(v.depthTexture.format===as)Ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Pe(S){const v=n.get(S),O=S.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==S.depthTexture){const q=S.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=q}if(S.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");we(v.__webglFramebuffer,S)}else if(O){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=i.createRenderbuffer(),re(v.__webglDepthbuffer[q],S,!1);else{const Z=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=v.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,G)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),re(v.__webglDepthbuffer,S,!1);else{const q=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,Z)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Be(S,v,O){const q=n.get(S);v!==void 0&&ve(q.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Pe(S)}function ht(S){const v=S.texture,O=n.get(S),q=n.get(v);S.addEventListener("dispose",w);const Z=S.textures,G=S.isWebGLCubeRenderTarget===!0,be=Z.length>1;if(be||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,r.memory.textures++),G){O.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[oe]=[];for(let de=0;de<v.mipmaps.length;de++)O.__webglFramebuffer[oe][de]=i.createFramebuffer()}else O.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let oe=0;oe<v.mipmaps.length;oe++)O.__webglFramebuffer[oe]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(be)for(let oe=0,de=Z.length;oe<de;oe++){const je=n.get(Z[oe]);je.__webglTexture===void 0&&(je.__webglTexture=i.createTexture(),r.memory.textures++)}if(S.samples>0&&Ge(S)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let oe=0;oe<Z.length;oe++){const de=Z[oe];O.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[oe]);const je=a.convert(de.format,de.colorSpace),Q=a.convert(de.type),fe=E(de.internalFormat,je,Q,de.colorSpace,S.isXRRenderTarget===!0),Te=Ve(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,fe,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,O.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),re(O.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),ke(i.TEXTURE_CUBE_MAP,v);for(let oe=0;oe<6;oe++)if(v.mipmaps&&v.mipmaps.length>0)for(let de=0;de<v.mipmaps.length;de++)ve(O.__webglFramebuffer[oe][de],S,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,de);else ve(O.__webglFramebuffer[oe],S,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(v)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let oe=0,de=Z.length;oe<de;oe++){const je=Z[oe],Q=n.get(je);t.bindTexture(i.TEXTURE_2D,Q.__webglTexture),ke(i.TEXTURE_2D,je),ve(O.__webglFramebuffer,S,je,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,0),m(je)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(oe=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,q.__webglTexture),ke(oe,v),v.mipmaps&&v.mipmaps.length>0)for(let de=0;de<v.mipmaps.length;de++)ve(O.__webglFramebuffer[de],S,v,i.COLOR_ATTACHMENT0,oe,de);else ve(O.__webglFramebuffer,S,v,i.COLOR_ATTACHMENT0,oe,0);m(v)&&f(oe),t.unbindTexture()}S.depthBuffer&&Pe(S)}function Xe(S){const v=S.textures;for(let O=0,q=v.length;O<q;O++){const Z=v[O];if(m(Z)){const G=T(S),be=n.get(Z).__webglTexture;t.bindTexture(G,be),f(G),t.unbindTexture()}}}const dt=[],D=[];function qt(S){if(S.samples>0){if(Ge(S)===!1){const v=S.textures,O=S.width,q=S.height;let Z=i.COLOR_BUFFER_BIT;const G=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(S),oe=v.length>1;if(oe)for(let de=0;de<v.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let de=0;de<v.length;de++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[de]);const je=n.get(v[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,je,0)}i.blitFramebuffer(0,0,O,q,0,0,O,q,Z,i.NEAREST),l===!0&&(dt.length=0,D.length=0,dt.push(i.COLOR_ATTACHMENT0+de),S.depthBuffer&&S.resolveDepthBuffer===!1&&(dt.push(G),D.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,dt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let de=0;de<v.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,be.__webglColorRenderbuffer[de]);const je=n.get(v[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const v=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Ve(S){return Math.min(s.maxSamples,S.samples)}function Ge(S){const v=n.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Se(S){const v=r.render.frame;h.get(S)!==v&&(h.set(S,v),S.update())}function rt(S,v){const O=S.colorSpace,q=S.format,Z=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||O!==Ut&&O!==Zn&&(He.getTransfer(O)===et?(q!==Zt||Z!==Bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function Me(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=W,this.setTexture2D=K,this.setTexture2DArray=j,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=Be,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=qt,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Ge}function tv(i,e){function t(n,s=Zn){let a;const r=He.getTransfer(s);if(n===Bn)return i.UNSIGNED_BYTE;if(n===qo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Wh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Vh)return i.BYTE;if(n===Gh)return i.SHORT;if(n===Vs)return i.UNSIGNED_SHORT;if(n===jo)return i.INT;if(n===yi)return i.UNSIGNED_INT;if(n===on)return i.FLOAT;if(n===qs)return i.HALF_FLOAT;if(n===Xh)return i.ALPHA;if(n===jh)return i.RGB;if(n===Zt)return i.RGBA;if(n===qh)return i.LUMINANCE;if(n===Yh)return i.LUMINANCE_ALPHA;if(n===Zi)return i.DEPTH_COMPONENT;if(n===as)return i.DEPTH_STENCIL;if(n===$o)return i.RED;if(n===Ko)return i.RED_INTEGER;if(n===$h)return i.RG;if(n===Zo)return i.RG_INTEGER;if(n===Jo)return i.RGBA_INTEGER;if(n===Na||n===Ua||n===Oa||n===Fa)if(r===et)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Na)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ua)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Oa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Na)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ua)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Oa)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===so||n===ao||n===ro||n===oo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===so)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ao)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ro)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lo||n===co||n===ho)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===lo||n===co)return r===et?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===ho)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===bo||n===yo||n===xo||n===Mo||n===So||n===To||n===Eo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===uo)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fo)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===po)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===mo)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===go)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_o)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vo)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bo)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yo)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xo)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mo)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===So)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===To)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eo)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ka||n===wo||n===Ao)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===ka)return r===et?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ao)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kh||n===Ro||n===Co||n===Lo)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===ka)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Ro)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Co)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Lo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class nv extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ln extends ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const iv={type:"move"};class Nr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(iv)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ln;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const sv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,av=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Mt,a=e.properties.get(s);a.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ai({vertexShader:sv,fragmentShader:av,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xt(new er(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ov extends Ti{constructor(e,t){super();const n=this;let s=null,a=1,r=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null;const _=new rv,m=t.getContextAttributes();let f=null,T=null;const E=[],x=[],U=new Ae;let R=null;const w=new Rt;w.viewport=new Ye;const N=new Rt;N.viewport=new Ye;const M=[w,N],y=new nv;let C=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let te=E[X];return te===void 0&&(te=new Nr,E[X]=te),te.getTargetRaySpace()},this.getControllerGrip=function(X){let te=E[X];return te===void 0&&(te=new Nr,E[X]=te),te.getGripSpace()},this.getHand=function(X){let te=E[X];return te===void 0&&(te=new Nr,E[X]=te),te.getHandSpace()};function z(X){const te=x.indexOf(X.inputSource);if(te===-1)return;const ve=E[te];ve!==void 0&&(ve.update(X.inputSource,X.frame,c||r),ve.dispatchEvent({type:X.type,data:X.inputSource}))}function $(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",K);for(let X=0;X<E.length;X++){const te=x[X];te!==null&&(x[X]=null,E[X].disconnect(te))}C=null,W=null,_.reset(),e.setRenderTarget(f),p=null,d=null,u=null,s=null,T=null,nt.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",$),s.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(U),s.renderState.layers===void 0){const te={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new xi(p.framebufferWidth,p.framebufferHeight,{format:Zt,type:Bn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let te=null,ve=null,re=null;m.depth&&(re=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=m.stencil?as:Zi,ve=m.stencil?ss:yi);const we={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:a};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(we),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new xi(d.textureWidth,d.textureHeight,{format:Zt,type:Bn,depthTexture:new hu(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),nt.setContext(s),nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K(X){for(let te=0;te<X.removed.length;te++){const ve=X.removed[te],re=x.indexOf(ve);re>=0&&(x[re]=null,E[re].disconnect(ve))}for(let te=0;te<X.added.length;te++){const ve=X.added[te];let re=x.indexOf(ve);if(re===-1){for(let Pe=0;Pe<E.length;Pe++)if(Pe>=x.length){x.push(ve),re=Pe;break}else if(x[Pe]===null){x[Pe]=ve,re=Pe;break}if(re===-1)break}const we=E[re];we&&we.connect(ve)}}const j=new A,J=new A;function V(X,te,ve){j.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(ve.matrixWorld);const re=j.distanceTo(J),we=te.projectionMatrix.elements,Pe=ve.projectionMatrix.elements,Be=we[14]/(we[10]-1),ht=we[14]/(we[10]+1),Xe=(we[9]+1)/we[5],dt=(we[9]-1)/we[5],D=(we[8]-1)/we[0],qt=(Pe[8]+1)/Pe[0],Ve=Be*D,Ge=Be*qt,Se=re/(-D+qt),rt=Se*-D;if(te.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(rt),X.translateZ(Se),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),we[10]===-1)X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Me=Be+Se,S=ht+Se,v=Ve-rt,O=Ge+(re-rt),q=Xe*ht/S*Me,Z=dt*ht/S*Me;X.projectionMatrix.makePerspective(v,O,q,Z,Me,S),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ae(X,te){te===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(te.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let te=X.near,ve=X.far;_.texture!==null&&(_.depthNear>0&&(te=_.depthNear),_.depthFar>0&&(ve=_.depthFar)),y.near=N.near=w.near=te,y.far=N.far=w.far=ve,(C!==y.near||W!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,W=y.far),w.layers.mask=X.layers.mask|2,N.layers.mask=X.layers.mask|4,y.layers.mask=w.layers.mask|N.layers.mask;const re=X.parent,we=y.cameras;ae(y,re);for(let Pe=0;Pe<we.length;Pe++)ae(we[Pe],re);we.length===2?V(y,w,N):y.projectionMatrix.copy(w.projectionMatrix),ue(X,y,re)};function ue(X,te,ve){ve===null?X.matrix.copy(te.matrixWorld):(X.matrix.copy(ve.matrixWorld),X.matrix.invert(),X.matrix.multiply(te.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=rs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let xe=null;function ke(X,te){if(h=te.getViewerPose(c||r),g=te,h!==null){const ve=h.views;p!==null&&(e.setRenderTargetFramebuffer(T,p.framebuffer),e.setRenderTarget(T));let re=!1;ve.length!==y.cameras.length&&(y.cameras.length=0,re=!0);for(let Pe=0;Pe<ve.length;Pe++){const Be=ve[Pe];let ht=null;if(p!==null)ht=p.getViewport(Be);else{const dt=u.getViewSubImage(d,Be);ht=dt.viewport,Pe===0&&(e.setRenderTargetTextures(T,dt.colorTexture,d.ignoreDepthValues?void 0:dt.depthStencilTexture),e.setRenderTarget(T))}let Xe=M[Pe];Xe===void 0&&(Xe=new Rt,Xe.layers.enable(Pe),Xe.viewport=new Ye,M[Pe]=Xe),Xe.matrix.fromArray(Be.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(Be.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(ht.x,ht.y,ht.width,ht.height),Pe===0&&(y.matrix.copy(Xe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),re===!0&&y.cameras.push(Xe)}const we=s.enabledFeatures;if(we&&we.includes("depth-sensing")){const Pe=u.getDepthInformation(ve[0]);Pe&&Pe.isValid&&Pe.texture&&_.init(e,Pe,s.renderState)}}for(let ve=0;ve<E.length;ve++){const re=x[ve],we=E[ve];re!==null&&we!==void 0&&we.update(re,te,c||r)}xe&&xe(X,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),g=null}const nt=new cu;nt.setAnimationLoop(ke),this.setAnimationLoop=function(X){xe=X},this.dispose=function(){}}}const di=new _n,lv=new Le;function cv(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,ru(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,T,E,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(m,f):f.isMeshToonMaterial?(a(m,f),u(m,f)):f.isMeshPhongMaterial?(a(m,f),h(m,f)):f.isMeshStandardMaterial?(a(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(a(m,f),g(m,f)):f.isMeshDepthMaterial?a(m,f):f.isMeshDistanceMaterial?(a(m,f),_(m,f)):f.isMeshNormalMaterial?a(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,T,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===zt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===zt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const T=e.get(f),E=T.envMap,x=T.envMapRotation;E&&(m.envMap.value=E,di.copy(x),di.x*=-1,di.y*=-1,di.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),m.envMapRotation.value.setFromMatrix4(lv.makeRotationFromEuler(di)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,T,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=E*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===zt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const T=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function hv(i,e,t,n){let s={},a={},r=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const x=E.program;n.uniformBlockBinding(T,x)}function c(T,E){let x=s[T.id];x===void 0&&(g(T),x=h(T),s[T.id]=x,T.addEventListener("dispose",m));const U=E.program;n.updateUBOMapping(T,U);const R=e.render.frame;a[T.id]!==R&&(d(T),a[T.id]=R)}function h(T){const E=u();T.__bindingPointIndex=E;const x=i.createBuffer(),U=T.__size,R=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,U,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,x),x}function u(){for(let T=0;T<o;T++)if(r.indexOf(T)===-1)return r.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const E=s[T.id],x=T.uniforms,U=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let R=0,w=x.length;R<w;R++){const N=Array.isArray(x[R])?x[R]:[x[R]];for(let M=0,y=N.length;M<y;M++){const C=N[M];if(p(C,R,M,U)===!0){const W=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let $=0;for(let K=0;K<z.length;K++){const j=z[K],J=_(j);typeof j=="number"||typeof j=="boolean"?(C.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,W+$,C.__data)):j.isMatrix3?(C.__data[0]=j.elements[0],C.__data[1]=j.elements[1],C.__data[2]=j.elements[2],C.__data[3]=0,C.__data[4]=j.elements[3],C.__data[5]=j.elements[4],C.__data[6]=j.elements[5],C.__data[7]=0,C.__data[8]=j.elements[6],C.__data[9]=j.elements[7],C.__data[10]=j.elements[8],C.__data[11]=0):(j.toArray(C.__data,$),$+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,E,x,U){const R=T.value,w=E+"_"+x;if(U[w]===void 0)return typeof R=="number"||typeof R=="boolean"?U[w]=R:U[w]=R.clone(),!0;{const N=U[w];if(typeof R=="number"||typeof R=="boolean"){if(N!==R)return U[w]=R,!0}else if(N.equals(R)===!1)return N.copy(R),!0}return!1}function g(T){const E=T.uniforms;let x=0;const U=16;for(let w=0,N=E.length;w<N;w++){const M=Array.isArray(E[w])?E[w]:[E[w]];for(let y=0,C=M.length;y<C;y++){const W=M[y],z=Array.isArray(W.value)?W.value:[W.value];for(let $=0,K=z.length;$<K;$++){const j=z[$],J=_(j),V=x%U,ae=V%J.boundary,ue=V+ae;x+=ae,ue!==0&&U-ue<J.storage&&(x+=U-ue),W.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=x,x+=J.storage}}}const R=x%U;return R>0&&(x+=U-R),T.__size=x,T.__cache={},this}function _(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function m(T){const E=T.target;E.removeEventListener("dispose",m);const x=r.indexOf(E.__bindingPointIndex);r.splice(x,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete a[E.id]}function f(){for(const T in s)i.deleteBuffer(s[T]);r=[],s={},a={}}return{bind:l,update:c,dispose:f}}class Oc{constructor(e={}){const{canvas:t=Jd(),context:n=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=r;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=gt,this.toneMapping=ii,this.toneMappingExposure=1;const x=this;let U=!1,R=0,w=0,N=null,M=-1,y=null;const C=new Ye,W=new Ye;let z=null;const $=new Ee(0);let K=0,j=t.width,J=t.height,V=1,ae=null,ue=null;const xe=new Ye(0,0,j,J),ke=new Ye(0,0,j,J);let nt=!1;const X=new tl;let te=!1,ve=!1;const re=new Le,we=new Le,Pe=new A,Be=new Ye,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function dt(){return N===null?V:1}let D=n;function qt(b,P){return t.getContext(b,P)}try{const b={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xo}`),t.addEventListener("webglcontextlost",Y,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",le,!1),D===null){const P="webgl2";if(D=qt(P,b),D===null)throw qt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ve,Ge,Se,rt,Me,S,v,O,q,Z,G,be,oe,de,je,Q,fe,Te,Re,pe,We,Oe,st,L;function se(){Ve=new gg(D),Ve.init(),Oe=new tv(D,Ve),Ge=new hg(D,Ve,e,Oe),Se=new J_(D,Ve),Ge.reverseDepthBuffer&&d&&Se.buffers.depth.setReversed(!0),rt=new bg(D),Me=new F_,S=new ev(D,Ve,Se,Me,Ge,Oe,rt),v=new dg(x),O=new mg(x),q=new wf(D),st=new lg(D,q),Z=new _g(D,q,rt,st),G=new xg(D,Z,q,rt),Re=new yg(D,Ge,S),Q=new ug(Me),be=new O_(x,v,O,Ve,Ge,st,Q),oe=new cv(x,Me),de=new B_,je=new X_(Ve),Te=new og(x,v,O,Se,G,p,l),fe=new K_(x,G,Ge),L=new hv(D,rt,Ge,Se),pe=new cg(D,Ve,rt),We=new vg(D,Ve,rt),rt.programs=be.programs,x.capabilities=Ge,x.extensions=Ve,x.properties=Me,x.renderLists=de,x.shadowMap=fe,x.state=Se,x.info=rt}se();const H=new ov(x,D);this.xr=H,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=Ve.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ve.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(b){b!==void 0&&(V=b,this.setSize(j,J,!1))},this.getSize=function(b){return b.set(j,J)},this.setSize=function(b,P,F=!0){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=b,J=P,t.width=Math.floor(b*V),t.height=Math.floor(P*V),F===!0&&(t.style.width=b+"px",t.style.height=P+"px"),this.setViewport(0,0,b,P)},this.getDrawingBufferSize=function(b){return b.set(j*V,J*V).floor()},this.setDrawingBufferSize=function(b,P,F){j=b,J=P,V=F,t.width=Math.floor(b*F),t.height=Math.floor(P*F),this.setViewport(0,0,b,P)},this.getCurrentViewport=function(b){return b.copy(C)},this.getViewport=function(b){return b.copy(xe)},this.setViewport=function(b,P,F,k){b.isVector4?xe.set(b.x,b.y,b.z,b.w):xe.set(b,P,F,k),Se.viewport(C.copy(xe).multiplyScalar(V).round())},this.getScissor=function(b){return b.copy(ke)},this.setScissor=function(b,P,F,k){b.isVector4?ke.set(b.x,b.y,b.z,b.w):ke.set(b,P,F,k),Se.scissor(W.copy(ke).multiplyScalar(V).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(b){Se.setScissorTest(nt=b)},this.setOpaqueSort=function(b){ae=b},this.setTransparentSort=function(b){ue=b},this.getClearColor=function(b){return b.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor.apply(Te,arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha.apply(Te,arguments)},this.clear=function(b=!0,P=!0,F=!0){let k=0;if(b){let I=!1;if(N!==null){const ee=N.texture.format;I=ee===Jo||ee===Zo||ee===Ko}if(I){const ee=N.texture.type,ce=ee===Bn||ee===yi||ee===Vs||ee===ss||ee===qo||ee===Yo,me=Te.getClearColor(),ge=Te.getClearAlpha(),Ce=me.r,Ne=me.g,_e=me.b;ce?(g[0]=Ce,g[1]=Ne,g[2]=_e,g[3]=ge,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Ce,_[1]=Ne,_[2]=_e,_[3]=ge,D.clearBufferiv(D.COLOR,0,_))}else k|=D.COLOR_BUFFER_BIT}P&&(k|=D.DEPTH_BUFFER_BIT),F&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Y,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",le,!1),de.dispose(),je.dispose(),Me.dispose(),v.dispose(),O.dispose(),G.dispose(),st.dispose(),L.dispose(),be.dispose(),H.dispose(),H.removeEventListener("sessionstart",Tl),H.removeEventListener("sessionend",El),ri.stop()};function Y(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;const b=rt.autoReset,P=fe.enabled,F=fe.autoUpdate,k=fe.needsUpdate,I=fe.type;se(),rt.autoReset=b,fe.enabled=P,fe.autoUpdate=F,fe.needsUpdate=k,fe.type=I}function le(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function De(b){const P=b.target;P.removeEventListener("dispose",De),ut(P)}function ut(b){Tt(b),Me.remove(b)}function Tt(b){const P=Me.get(b).programs;P!==void 0&&(P.forEach(function(F){be.releaseProgram(F)}),b.isShaderMaterial&&be.releaseShaderCache(b))}this.renderBufferDirect=function(b,P,F,k,I,ee){P===null&&(P=ht);const ce=I.isMesh&&I.matrixWorld.determinant()<0,me=ku(b,P,F,k,I);Se.setMaterial(k,ce);let ge=F.index,Ce=1;if(k.wireframe===!0){if(ge=Z.getWireframeAttribute(F),ge===void 0)return;Ce=2}const Ne=F.drawRange,_e=F.attributes.position;let qe=Ne.start*Ce,at=(Ne.start+Ne.count)*Ce;ee!==null&&(qe=Math.max(qe,ee.start*Ce),at=Math.min(at,(ee.start+ee.count)*Ce)),ge!==null?(qe=Math.max(qe,0),at=Math.min(at,ge.count)):_e!=null&&(qe=Math.max(qe,0),at=Math.min(at,_e.count));const ot=at-qe;if(ot<0||ot===1/0)return;st.setup(I,k,me,F,ge);let Ot,$e=pe;if(ge!==null&&(Ot=q.get(ge),$e=We,$e.setIndex(Ot)),I.isMesh)k.wireframe===!0?(Se.setLineWidth(k.wireframeLinewidth*dt()),$e.setMode(D.LINES)):$e.setMode(D.TRIANGLES);else if(I.isLine){let ye=k.linewidth;ye===void 0&&(ye=1),Se.setLineWidth(ye*dt()),I.isLineSegments?$e.setMode(D.LINES):I.isLineLoop?$e.setMode(D.LINE_LOOP):$e.setMode(D.LINE_STRIP)}else I.isPoints?$e.setMode(D.POINTS):I.isSprite&&$e.setMode(D.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)$e.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))$e.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const ye=I._multiDrawStarts,Tn=I._multiDrawCounts,Ke=I._multiDrawCount,Qt=ge?q.get(ge).bytesPerElement:1,Ei=Me.get(k).currentProgram.getUniforms();for(let Ht=0;Ht<Ke;Ht++)Ei.setValue(D,"_gl_DrawID",Ht),$e.render(ye[Ht]/Qt,Tn[Ht])}else if(I.isInstancedMesh)$e.renderInstances(qe,ot,I.count);else if(F.isInstancedBufferGeometry){const ye=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Tn=Math.min(F.instanceCount,ye);$e.renderInstances(qe,ot,Tn)}else $e.render(qe,ot)};function Ze(b,P,F){b.transparent===!0&&b.side===sn&&b.forceSinglePass===!1?(b.side=zt,b.needsUpdate=!0,Js(b,P,F),b.side=kn,b.needsUpdate=!0,Js(b,P,F),b.side=sn):Js(b,P,F)}this.compile=function(b,P,F=null){F===null&&(F=b),f=je.get(F),f.init(P),E.push(f),F.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(f.pushLight(I),I.castShadow&&f.pushShadow(I))}),b!==F&&b.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(f.pushLight(I),I.castShadow&&f.pushShadow(I))}),f.setupLights();const k=new Set;return b.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const ee=I.material;if(ee)if(Array.isArray(ee))for(let ce=0;ce<ee.length;ce++){const me=ee[ce];Ze(me,F,I),k.add(me)}else Ze(ee,F,I),k.add(ee)}),E.pop(),f=null,k},this.compileAsync=function(b,P,F=null){const k=this.compile(b,P,F);return new Promise(I=>{function ee(){if(k.forEach(function(ce){Me.get(ce).currentProgram.isReady()&&k.delete(ce)}),k.size===0){I(b);return}setTimeout(ee,10)}Ve.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let Jt=null;function Sn(b){Jt&&Jt(b)}function Tl(){ri.stop()}function El(){ri.start()}const ri=new cu;ri.setAnimationLoop(Sn),typeof self<"u"&&ri.setContext(self),this.setAnimationLoop=function(b){Jt=b,H.setAnimationLoop(b),b===null?ri.stop():ri.start()},H.addEventListener("sessionstart",Tl),H.addEventListener("sessionend",El),this.render=function(b,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(H.cameraAutoUpdate===!0&&H.updateCamera(P),P=H.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,P,N),f=je.get(b,E.length),f.init(P),E.push(f),we.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),X.setFromProjectionMatrix(we),ve=this.localClippingEnabled,te=Q.init(this.clippingPlanes,ve),m=de.get(b,T.length),m.init(),T.push(m),H.enabled===!0&&H.isPresenting===!0){const ee=x.xr.getDepthSensingMesh();ee!==null&&rr(ee,P,-1/0,x.sortObjects)}rr(b,P,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ae,ue),Xe=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,Xe&&Te.addToRenderList(m,b),this.info.render.frame++,te===!0&&Q.beginShadows();const F=f.state.shadowsArray;fe.render(F,b,P),te===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=m.opaque,I=m.transmissive;if(f.setupLights(),P.isArrayCamera){const ee=P.cameras;if(I.length>0)for(let ce=0,me=ee.length;ce<me;ce++){const ge=ee[ce];Al(k,I,b,ge)}Xe&&Te.render(b);for(let ce=0,me=ee.length;ce<me;ce++){const ge=ee[ce];wl(m,b,ge,ge.viewport)}}else I.length>0&&Al(k,I,b,P),Xe&&Te.render(b),wl(m,b,P);N!==null&&(S.updateMultisampleRenderTarget(N),S.updateRenderTargetMipmap(N)),b.isScene===!0&&b.onAfterRender(x,b,P),st.resetDefaultState(),M=-1,y=null,E.pop(),E.length>0?(f=E[E.length-1],te===!0&&Q.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function rr(b,P,F,k){if(b.visible===!1)return;if(b.layers.test(P.layers)){if(b.isGroup)F=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(P);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){k&&Be.setFromMatrixPosition(b.matrixWorld).applyMatrix4(we);const ce=G.update(b),me=b.material;me.visible&&m.push(b,ce,me,F,Be.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const ce=G.update(b),me=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Be.copy(b.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Be.copy(ce.boundingSphere.center)),Be.applyMatrix4(b.matrixWorld).applyMatrix4(we)),Array.isArray(me)){const ge=ce.groups;for(let Ce=0,Ne=ge.length;Ce<Ne;Ce++){const _e=ge[Ce],qe=me[_e.materialIndex];qe&&qe.visible&&m.push(b,ce,qe,F,Be.z,_e)}}else me.visible&&m.push(b,ce,me,F,Be.z,null)}}const ee=b.children;for(let ce=0,me=ee.length;ce<me;ce++)rr(ee[ce],P,F,k)}function wl(b,P,F,k){const I=b.opaque,ee=b.transmissive,ce=b.transparent;f.setupLightsView(F),te===!0&&Q.setGlobalState(x.clippingPlanes,F),k&&Se.viewport(C.copy(k)),I.length>0&&Zs(I,P,F),ee.length>0&&Zs(ee,P,F),ce.length>0&&Zs(ce,P,F),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Al(b,P,F,k){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[k.id]===void 0&&(f.state.transmissionRenderTarget[k.id]=new xi(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?qs:Bn,minFilter:Dn,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:He.workingColorSpace}));const ee=f.state.transmissionRenderTarget[k.id],ce=k.viewport||C;ee.setSize(ce.z,ce.w);const me=x.getRenderTarget();x.setRenderTarget(ee),x.getClearColor($),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),x.clear(),Xe&&Te.render(F);const ge=x.toneMapping;x.toneMapping=ii;const Ce=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),f.setupLightsView(k),te===!0&&Q.setGlobalState(x.clippingPlanes,k),Zs(b,F,k),S.updateMultisampleRenderTarget(ee),S.updateRenderTargetMipmap(ee),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let _e=0,qe=P.length;_e<qe;_e++){const at=P[_e],ot=at.object,Ot=at.geometry,$e=at.material,ye=at.group;if($e.side===sn&&ot.layers.test(k.layers)){const Tn=$e.side;$e.side=zt,$e.needsUpdate=!0,Rl(ot,F,k,Ot,$e,ye),$e.side=Tn,$e.needsUpdate=!0,Ne=!0}}Ne===!0&&(S.updateMultisampleRenderTarget(ee),S.updateRenderTargetMipmap(ee))}x.setRenderTarget(me),x.setClearColor($,K),Ce!==void 0&&(k.viewport=Ce),x.toneMapping=ge}function Zs(b,P,F){const k=P.isScene===!0?P.overrideMaterial:null;for(let I=0,ee=b.length;I<ee;I++){const ce=b[I],me=ce.object,ge=ce.geometry,Ce=k===null?ce.material:k,Ne=ce.group;me.layers.test(F.layers)&&Rl(me,P,F,ge,Ce,Ne)}}function Rl(b,P,F,k,I,ee){b.onBeforeRender(x,P,F,k,I,ee),b.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),I.onBeforeRender(x,P,F,k,b,ee),I.transparent===!0&&I.side===sn&&I.forceSinglePass===!1?(I.side=zt,I.needsUpdate=!0,x.renderBufferDirect(F,P,k,I,b,ee),I.side=kn,I.needsUpdate=!0,x.renderBufferDirect(F,P,k,I,b,ee),I.side=sn):x.renderBufferDirect(F,P,k,I,b,ee),b.onAfterRender(x,P,F,k,I,ee)}function Js(b,P,F){P.isScene!==!0&&(P=ht);const k=Me.get(b),I=f.state.lights,ee=f.state.shadowsArray,ce=I.state.version,me=be.getParameters(b,I.state,ee,P,F),ge=be.getProgramCacheKey(me);let Ce=k.programs;k.environment=b.isMeshStandardMaterial?P.environment:null,k.fog=P.fog,k.envMap=(b.isMeshStandardMaterial?O:v).get(b.envMap||k.environment),k.envMapRotation=k.environment!==null&&b.envMap===null?P.environmentRotation:b.envMapRotation,Ce===void 0&&(b.addEventListener("dispose",De),Ce=new Map,k.programs=Ce);let Ne=Ce.get(ge);if(Ne!==void 0){if(k.currentProgram===Ne&&k.lightsStateVersion===ce)return Ll(b,me),Ne}else me.uniforms=be.getUniforms(b),b.onBeforeCompile(me,x),Ne=be.acquireProgram(me,ge),Ce.set(ge,Ne),k.uniforms=me.uniforms;const _e=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(_e.clippingPlanes=Q.uniform),Ll(b,me),k.needsLights=zu(b),k.lightsStateVersion=ce,k.needsLights&&(_e.ambientLightColor.value=I.state.ambient,_e.lightProbe.value=I.state.probe,_e.directionalLights.value=I.state.directional,_e.directionalLightShadows.value=I.state.directionalShadow,_e.spotLights.value=I.state.spot,_e.spotLightShadows.value=I.state.spotShadow,_e.rectAreaLights.value=I.state.rectArea,_e.ltc_1.value=I.state.rectAreaLTC1,_e.ltc_2.value=I.state.rectAreaLTC2,_e.pointLights.value=I.state.point,_e.pointLightShadows.value=I.state.pointShadow,_e.hemisphereLights.value=I.state.hemi,_e.directionalShadowMap.value=I.state.directionalShadowMap,_e.directionalShadowMatrix.value=I.state.directionalShadowMatrix,_e.spotShadowMap.value=I.state.spotShadowMap,_e.spotLightMatrix.value=I.state.spotLightMatrix,_e.spotLightMap.value=I.state.spotLightMap,_e.pointShadowMap.value=I.state.pointShadowMap,_e.pointShadowMatrix.value=I.state.pointShadowMatrix),k.currentProgram=Ne,k.uniformsList=null,Ne}function Cl(b){if(b.uniformsList===null){const P=b.currentProgram.getUniforms();b.uniformsList=Ba.seqWithValue(P.seq,b.uniforms)}return b.uniformsList}function Ll(b,P){const F=Me.get(b);F.outputColorSpace=P.outputColorSpace,F.batching=P.batching,F.batchingColor=P.batchingColor,F.instancing=P.instancing,F.instancingColor=P.instancingColor,F.instancingMorph=P.instancingMorph,F.skinning=P.skinning,F.morphTargets=P.morphTargets,F.morphNormals=P.morphNormals,F.morphColors=P.morphColors,F.morphTargetsCount=P.morphTargetsCount,F.numClippingPlanes=P.numClippingPlanes,F.numIntersection=P.numClipIntersection,F.vertexAlphas=P.vertexAlphas,F.vertexTangents=P.vertexTangents,F.toneMapping=P.toneMapping}function ku(b,P,F,k,I){P.isScene!==!0&&(P=ht),S.resetTextureUnits();const ee=P.fog,ce=k.isMeshStandardMaterial?P.environment:null,me=N===null?x.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Ut,ge=(k.isMeshStandardMaterial?O:v).get(k.envMap||ce),Ce=k.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ne=!!F.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),_e=!!F.morphAttributes.position,qe=!!F.morphAttributes.normal,at=!!F.morphAttributes.color;let ot=ii;k.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(ot=x.toneMapping);const Ot=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,$e=Ot!==void 0?Ot.length:0,ye=Me.get(k),Tn=f.state.lights;if(te===!0&&(ve===!0||b!==y)){const Yt=b===y&&k.id===M;Q.setState(k,b,Yt)}let Ke=!1;k.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==Tn.state.version||ye.outputColorSpace!==me||I.isBatchedMesh&&ye.batching===!1||!I.isBatchedMesh&&ye.batching===!0||I.isBatchedMesh&&ye.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&ye.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&ye.instancing===!1||!I.isInstancedMesh&&ye.instancing===!0||I.isSkinnedMesh&&ye.skinning===!1||!I.isSkinnedMesh&&ye.skinning===!0||I.isInstancedMesh&&ye.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&ye.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&ye.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&ye.instancingMorph===!1&&I.morphTexture!==null||ye.envMap!==ge||k.fog===!0&&ye.fog!==ee||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Q.numPlanes||ye.numIntersection!==Q.numIntersection)||ye.vertexAlphas!==Ce||ye.vertexTangents!==Ne||ye.morphTargets!==_e||ye.morphNormals!==qe||ye.morphColors!==at||ye.toneMapping!==ot||ye.morphTargetsCount!==$e)&&(Ke=!0):(Ke=!0,ye.__version=k.version);let Qt=ye.currentProgram;Ke===!0&&(Qt=Js(k,P,I));let Ei=!1,Ht=!1,bs=!1;const lt=Qt.getUniforms(),un=ye.uniforms;if(Se.useProgram(Qt.program)&&(Ei=!0,Ht=!0,bs=!0),k.id!==M&&(M=k.id,Ht=!0),Ei||y!==b){Se.buffers.depth.getReversed()?(re.copy(b.projectionMatrix),ef(re),tf(re),lt.setValue(D,"projectionMatrix",re)):lt.setValue(D,"projectionMatrix",b.projectionMatrix),lt.setValue(D,"viewMatrix",b.matrixWorldInverse);const zn=lt.map.cameraPosition;zn!==void 0&&zn.setValue(D,Pe.setFromMatrixPosition(b.matrixWorld)),Ge.logarithmicDepthBuffer&&lt.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&lt.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Ht=!0,bs=!0)}if(I.isSkinnedMesh){lt.setOptional(D,I,"bindMatrix"),lt.setOptional(D,I,"bindMatrixInverse");const Yt=I.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),lt.setValue(D,"boneTexture",Yt.boneTexture,S))}I.isBatchedMesh&&(lt.setOptional(D,I,"batchingTexture"),lt.setValue(D,"batchingTexture",I._matricesTexture,S),lt.setOptional(D,I,"batchingIdTexture"),lt.setValue(D,"batchingIdTexture",I._indirectTexture,S),lt.setOptional(D,I,"batchingColorTexture"),I._colorsTexture!==null&&lt.setValue(D,"batchingColorTexture",I._colorsTexture,S));const ys=F.morphAttributes;if((ys.position!==void 0||ys.normal!==void 0||ys.color!==void 0)&&Re.update(I,F,Qt),(Ht||ye.receiveShadow!==I.receiveShadow)&&(ye.receiveShadow=I.receiveShadow,lt.setValue(D,"receiveShadow",I.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(un.envMap.value=ge,un.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&P.environment!==null&&(un.envMapIntensity.value=P.environmentIntensity),Ht&&(lt.setValue(D,"toneMappingExposure",x.toneMappingExposure),ye.needsLights&&Bu(un,bs),ee&&k.fog===!0&&oe.refreshFogUniforms(un,ee),oe.refreshMaterialUniforms(un,k,V,J,f.state.transmissionRenderTarget[b.id]),Ba.upload(D,Cl(ye),un,S)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Ba.upload(D,Cl(ye),un,S),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&lt.setValue(D,"center",I.center),lt.setValue(D,"modelViewMatrix",I.modelViewMatrix),lt.setValue(D,"normalMatrix",I.normalMatrix),lt.setValue(D,"modelMatrix",I.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Yt=k.uniformsGroups;for(let zn=0,Hn=Yt.length;zn<Hn;zn++){const Pl=Yt[zn];L.update(Pl,Qt),L.bind(Pl,Qt)}}return Qt}function Bu(b,P){b.ambientLightColor.needsUpdate=P,b.lightProbe.needsUpdate=P,b.directionalLights.needsUpdate=P,b.directionalLightShadows.needsUpdate=P,b.pointLights.needsUpdate=P,b.pointLightShadows.needsUpdate=P,b.spotLights.needsUpdate=P,b.spotLightShadows.needsUpdate=P,b.rectAreaLights.needsUpdate=P,b.hemisphereLights.needsUpdate=P}function zu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(b,P,F){Me.get(b.texture).__webglTexture=P,Me.get(b.depthTexture).__webglTexture=F;const k=Me.get(b);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=F===void 0,k.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,P){const F=Me.get(b);F.__webglFramebuffer=P,F.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(b,P=0,F=0){N=b,R=P,w=F;let k=!0,I=null,ee=!1,ce=!1;if(b){const ge=Me.get(b);if(ge.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(D.FRAMEBUFFER,null),k=!1;else if(ge.__webglFramebuffer===void 0)S.setupRenderTarget(b);else if(ge.__hasExternalTextures)S.rebindTextures(b,Me.get(b.texture).__webglTexture,Me.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const _e=b.depthTexture;if(ge.__boundDepthTexture!==_e){if(_e!==null&&Me.has(_e)&&(b.width!==_e.image.width||b.height!==_e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");S.setupDepthRenderbuffer(b)}}const Ce=b.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ce=!0);const Ne=Me.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ne[P])?I=Ne[P][F]:I=Ne[P],ee=!0):b.samples>0&&S.useMultisampledRTT(b)===!1?I=Me.get(b).__webglMultisampledFramebuffer:Array.isArray(Ne)?I=Ne[F]:I=Ne,C.copy(b.viewport),W.copy(b.scissor),z=b.scissorTest}else C.copy(xe).multiplyScalar(V).floor(),W.copy(ke).multiplyScalar(V).floor(),z=nt;if(Se.bindFramebuffer(D.FRAMEBUFFER,I)&&k&&Se.drawBuffers(b,I),Se.viewport(C),Se.scissor(W),Se.setScissorTest(z),ee){const ge=Me.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+P,ge.__webglTexture,F)}else if(ce){const ge=Me.get(b.texture),Ce=P||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,ge.__webglTexture,F||0,Ce)}M=-1},this.readRenderTargetPixels=function(b,P,F,k,I,ee,ce){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=Me.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ce!==void 0&&(me=me[ce]),me){Se.bindFramebuffer(D.FRAMEBUFFER,me);try{const ge=b.texture,Ce=ge.format,Ne=ge.type;if(!Ge.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=b.width-k&&F>=0&&F<=b.height-I&&D.readPixels(P,F,k,I,Oe.convert(Ce),Oe.convert(Ne),ee)}finally{const ge=N!==null?Me.get(N).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,ge)}}},this.readRenderTargetPixelsAsync=async function(b,P,F,k,I,ee,ce){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=Me.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ce!==void 0&&(me=me[ce]),me){const ge=b.texture,Ce=ge.format,Ne=ge.type;if(!Ge.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=b.width-k&&F>=0&&F<=b.height-I){Se.bindFramebuffer(D.FRAMEBUFFER,me);const _e=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,_e),D.bufferData(D.PIXEL_PACK_BUFFER,ee.byteLength,D.STREAM_READ),D.readPixels(P,F,k,I,Oe.convert(Ce),Oe.convert(Ne),0);const qe=N!==null?Me.get(N).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,qe);const at=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Qd(D,at,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,_e),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ee),D.deleteBuffer(_e),D.deleteSync(at),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,P=null,F=0){b.isTexture!==!0&&(Ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,b=arguments[1]);const k=Math.pow(2,-F),I=Math.floor(b.image.width*k),ee=Math.floor(b.image.height*k),ce=P!==null?P.x:0,me=P!==null?P.y:0;S.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,F,0,0,ce,me,I,ee),Se.unbindTexture()},this.copyTextureToTexture=function(b,P,F=null,k=null,I=0){b.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,b=arguments[1],P=arguments[2],I=arguments[3]||0,F=null);let ee,ce,me,ge,Ce,Ne,_e,qe,at;const ot=b.isCompressedTexture?b.mipmaps[I]:b.image;F!==null?(ee=F.max.x-F.min.x,ce=F.max.y-F.min.y,me=F.isBox3?F.max.z-F.min.z:1,ge=F.min.x,Ce=F.min.y,Ne=F.isBox3?F.min.z:0):(ee=ot.width,ce=ot.height,me=ot.depth||1,ge=0,Ce=0,Ne=0),k!==null?(_e=k.x,qe=k.y,at=k.z):(_e=0,qe=0,at=0);const Ot=Oe.convert(P.format),$e=Oe.convert(P.type);let ye;P.isData3DTexture?(S.setTexture3D(P,0),ye=D.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(S.setTexture2DArray(P,0),ye=D.TEXTURE_2D_ARRAY):(S.setTexture2D(P,0),ye=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment);const Tn=D.getParameter(D.UNPACK_ROW_LENGTH),Ke=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Qt=D.getParameter(D.UNPACK_SKIP_PIXELS),Ei=D.getParameter(D.UNPACK_SKIP_ROWS),Ht=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ot.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ot.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ge),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ce),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ne);const bs=b.isDataArrayTexture||b.isData3DTexture,lt=P.isDataArrayTexture||P.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const un=Me.get(b),ys=Me.get(P),Yt=Me.get(un.__renderTarget),zn=Me.get(ys.__renderTarget);Se.bindFramebuffer(D.READ_FRAMEBUFFER,Yt.__webglFramebuffer),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,zn.__webglFramebuffer);for(let Hn=0;Hn<me;Hn++)bs&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(b).__webglTexture,I,Ne+Hn),b.isDepthTexture?(lt&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(P).__webglTexture,I,at+Hn),D.blitFramebuffer(ge,Ce,ee,ce,_e,qe,ee,ce,D.DEPTH_BUFFER_BIT,D.NEAREST)):lt?D.copyTexSubImage3D(ye,I,_e,qe,at+Hn,ge,Ce,ee,ce):D.copyTexSubImage2D(ye,I,_e,qe,at+Hn,ge,Ce,ee,ce);Se.bindFramebuffer(D.READ_FRAMEBUFFER,null),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else lt?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(ye,I,_e,qe,at,ee,ce,me,Ot,$e,ot.data):P.isCompressedArrayTexture?D.compressedTexSubImage3D(ye,I,_e,qe,at,ee,ce,me,Ot,ot.data):D.texSubImage3D(ye,I,_e,qe,at,ee,ce,me,Ot,$e,ot):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,I,_e,qe,ee,ce,Ot,$e,ot.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,I,_e,qe,ot.width,ot.height,Ot,ot.data):D.texSubImage2D(D.TEXTURE_2D,I,_e,qe,ee,ce,Ot,$e,ot);D.pixelStorei(D.UNPACK_ROW_LENGTH,Tn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ke),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Qt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ei),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ht),I===0&&P.generateMipmaps&&D.generateMipmap(ye),Se.unbindTexture()},this.copyTextureToTexture3D=function(b,P,F=null,k=null,I=0){return b.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,k=arguments[1]||null,b=arguments[2],P=arguments[3],I=arguments[4]||0),Ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,P,F,k,I)},this.initRenderTarget=function(b){Me.get(b).__webglFramebuffer===void 0&&S.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?S.setTextureCube(b,0):b.isData3DTexture?S.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?S.setTexture2DArray(b,0):S.setTexture2D(b,0),Se.unbindTexture()},this.resetState=function(){R=0,w=0,N=null,Se.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=He._getDrawingBufferColorSpace(e),t.unpackColorSpace=He._getUnpackColorSpace()}}class sl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ee(e),this.near=t,this.far=n}clone(){return new sl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class uv extends ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class dv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Io,this.updateRanges=[],this.version=0,this.uuid=cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,a=this.stride;s<a;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ct=new A;class al{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array),a=Je(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return new Nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new al(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Fc=new A,kc=new Ye,Bc=new Ye,fv=new A,zc=new Le,ba=new A,Ur=new bn,Hc=new Le,Or=new fs;class pv extends xt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=kl,this.bindMatrix=new Le,this.bindMatrixInverse=new Le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ba),this.boundingBox.expandByPoint(ba)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new bn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ba),this.boundingSphere.expandByPoint(ba)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ur.copy(this.boundingSphere),Ur.applyMatrix4(s),e.ray.intersectsSphere(Ur)!==!1&&(Hc.copy(s).invert(),Or.copy(e.ray).applyMatrix4(Hc),!(this.boundingBox!==null&&Or.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Or)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ye,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const a=1/e.manhattanLength();a!==1/0?e.multiplyScalar(a):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===kl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Sd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;kc.fromBufferAttribute(s.attributes.skinIndex,e),Bc.fromBufferAttribute(s.attributes.skinWeight,e),Fc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let a=0;a<4;a++){const r=Bc.getComponent(a);if(r!==0){const o=kc.getComponent(a);zc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(fv.copy(Fc).applyMatrix4(zc),r)}}return t.applyMatrix4(this.bindMatrixInverse)}}class mu extends ct{constructor(){super(),this.isBone=!0,this.type="Bone"}}class gu extends Mt{constructor(e=null,t=1,n=1,s,a,r,o,l,c=Dt,h=Dt,u,d){super(null,r,o,l,c,h,s,a,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vc=new Le,mv=new Le;class rl{constructor(e=[],t=[]){this.uuid=cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Le)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Le;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let a=0,r=e.length;a<r;a++){const o=e[a]?e[a].matrixWorld:mv;Vc.multiplyMatrices(o,t[a]),Vc.toArray(n,a*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new rl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new gu(t,e,e,Zt,on);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const a=e.bones[n];let r=t[a];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",a),r=new mu),this.bones.push(r),this.boneInverses.push(new Le().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,a=t.length;s<a;s++){const r=t[s];e.bones.push(r.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class No extends Nt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const zi=new Le,Gc=new Le,ya=[],Wc=new Xt,gv=new Le,Es=new xt,ws=new bn;class _v extends xt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new No(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,gv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zi),Wc.copy(e.boundingBox).applyMatrix4(zi),this.boundingBox.union(Wc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zi),ws.copy(e.boundingSphere).applyMatrix4(zi),this.boundingSphere.union(ws)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,a=n.length+1,r=e*a+1;for(let o=0;o<n.length;o++)n[o]=s[r+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Es.geometry=this.geometry,Es.material=this.material,Es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ws.copy(this.boundingSphere),ws.applyMatrix4(n),e.ray.intersectsSphere(ws)!==!1))for(let a=0;a<s;a++){this.getMatrixAt(a,zi),Gc.multiplyMatrices(n,zi),Es.matrixWorld=Gc,Es.raycast(e,ya);for(let r=0,o=ya.length;r<o;r++){const l=ya[r];l.instanceId=a,l.object=this,t.push(l)}ya.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new No(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new gu(new Float32Array(s*this.count),s,this.count,$o,on));const a=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=s*e;a[l]=o,a.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class _u extends mn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xa=new A,ja=new A,Xc=new Le,As=new fs,xa=new bn,Fr=new A,jc=new A;class ol extends ct{constructor(e=new yn,t=new _u){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,a=t.count;s<a;s++)Xa.fromBufferAttribute(t,s-1),ja.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Xa.distanceTo(ja);e.setAttribute("lineDistance",new On(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(s),xa.radius+=a,e.ray.intersectsSphere(xa)===!1)return;Xc.copy(s).invert(),As.copy(e.ray).applyMatrix4(Xc);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=p,m=g-1;_<m;_+=c){const f=h.getX(_),T=h.getX(_+1),E=Ma(this,e,As,l,f,T);E&&t.push(E)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),f=Ma(this,e,As,l,_,m);f&&t.push(f)}}else{const p=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let _=p,m=g-1;_<m;_+=c){const f=Ma(this,e,As,l,_,_+1);f&&t.push(f)}if(this.isLineLoop){const _=Ma(this,e,As,l,g-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Ma(i,e,t,n,s,a){const r=i.geometry.attributes.position;if(Xa.fromBufferAttribute(r,s),ja.fromBufferAttribute(r,a),t.distanceSqToSegment(Xa,ja,Fr,jc)>n)return;Fr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Fr);if(!(l<e.near||l>e.far))return{distance:l,point:jc.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const qc=new A,Yc=new A;class vv extends ol{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,a=t.count;s<a;s+=2)qc.fromBufferAttribute(t,s),Yc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+qc.distanceTo(Yc);e.setAttribute("lineDistance",new On(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class bv extends ol{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class vu extends mn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const $c=new Le,Uo=new fs,Sa=new bn,Ta=new A;class yv extends ct{constructor(e=new yn,t=new vu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,a=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sa.copy(n.boundingSphere),Sa.applyMatrix4(s),Sa.radius+=a,e.ray.intersectsSphere(Sa)===!1)return;$c.copy(s).invert(),Uo.copy(e.ray).applyMatrix4($c);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=d,_=p;g<_;g++){const m=c.getX(g);Ta.fromBufferAttribute(u,m),Kc(Ta,m,l,s,e,t,this)}}else{const d=Math.max(0,r.start),p=Math.min(u.count,r.start+r.count);for(let g=d,_=p;g<_;g++)Ta.fromBufferAttribute(u,g),Kc(Ta,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Kc(i,e,t,n,s,a,r){const o=Uo.distanceSqToPoint(i);if(o<t){const l=new A;Uo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class nr extends mn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jh,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xn extends nr{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return St(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Ea(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function xv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Mv(i){function e(s,a){return i[s]-i[a]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Zc(i,e,t){const n=i.length,s=new i.constructor(n);for(let a=0,r=0;r!==n;++a){const o=t[a]*e;for(let l=0;l!==e;++l)s[r++]=i[o+l]}return s}function bu(i,e,t,n){let s=1,a=i[0];for(;a!==void 0&&a[n]===void 0;)a=i[s++];if(a===void 0)return;let r=a[n];if(r!==void 0)if(Array.isArray(r))do r=a[n],r!==void 0&&(e.push(a.time),t.push.apply(t,r)),a=i[s++];while(a!==void 0);else if(r.toArray!==void 0)do r=a[n],r!==void 0&&(e.push(a.time),r.toArray(t,t.length)),a=i[s++];while(a!==void 0);else do r=a[n],r!==void 0&&(e.push(a.time),t.push(r)),a=i[s++];while(a!==void 0)}class $s{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],a=t[n-1];n:{e:{let r;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<a)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(a=s,s=t[++n],e<s)break e}r=t.length;break t}if(!(e>=a)){const o=t[1];e<o&&(n=2,a=o);for(let l=n-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=a,a=t[--n-1],e>=a)break e}r=n,n=0;break t}break n}for(;n<r;){const o=n+r>>>1;e<t[o]?r=o:n=o+1}if(s=t[n],a=t[n-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,a,s)}return this.interpolate_(n,a,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,a=e*s;for(let r=0;r!==s;++r)t[r]=n[a+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Sv extends $s{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bl,endingEnd:Bl}}intervalChanged_(e,t,n){const s=this.parameterPositions;let a=e-2,r=e+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case zl:a=e,o=2*t-n;break;case Hl:a=s.length-2,o=t+s[a]-s[a+1];break;default:a=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case zl:r=e,l=2*n-t;break;case Hl:r=1,l=n+s[1]-s[0];break;default:r=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=a*h,this._offsetNext=r*h}interpolate_(e,t,n,s){const a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,T=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,E=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let U=0;U!==o;++U)a[U]=f*r[h+U]+T*r[c+U]+E*r[l+U]+x*r[u+U];return a}}class Tv extends $s{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)a[d]=r[c+d]*u+r[l+d]*h;return a}}class Ev extends $s{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Mn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ea(t,this.TimeBufferType),this.values=Ea(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ea(e.times,Array),values:Ea(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ev(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Tv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Sv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Gs:t=this.InterpolantFactoryMethodDiscrete;break;case Ws:t=this.InterpolantFactoryMethodLinear;break;case or:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gs;case this.InterpolantFactoryMethodLinear:return Ws;case this.InterpolantFactoryMethodSmooth:return or}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let a=0,r=s-1;for(;a!==s&&n[a]<e;)++a;for(;r!==-1&&n[r]>t;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);const o=this.getValueSize();this.times=n.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,a=n.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==a;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),e=!1;break}r=l}if(s!==void 0&&xv(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===or,a=e.length-1;let r=1;for(let o=1;o<a;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[p+g]){l=!0;break}}}if(l){if(o!==r){e[r]=e[o];const u=o*n,d=r*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++r}}if(a>0){e[r]=e[a];for(let o=a*n,l=r*n,c=0;c!==n;++c)t[l+c]=t[o+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=Ws;class ms extends Mn{constructor(e,t,n){super(e,t,n)}}ms.prototype.ValueTypeName="bool";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=Gs;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;class yu extends Mn{}yu.prototype.ValueTypeName="color";class ls extends Mn{}ls.prototype.ValueTypeName="number";class wv extends $s{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let h=c+o;c!==h;c+=4)gn.slerpFlat(a,0,r,c-o,r,c,l);return a}}class cs extends Mn{InterpolantFactoryMethodLinear(e){return new wv(this.times,this.values,this.getValueSize(),e)}}cs.prototype.ValueTypeName="quaternion";cs.prototype.InterpolantFactoryMethodSmooth=void 0;class gs extends Mn{constructor(e,t,n){super(e,t,n)}}gs.prototype.ValueTypeName="string";gs.prototype.ValueBufferType=Array;gs.prototype.DefaultInterpolation=Gs;gs.prototype.InterpolantFactoryMethodLinear=void 0;gs.prototype.InterpolantFactoryMethodSmooth=void 0;class hs extends Mn{}hs.prototype.ValueTypeName="vector";class Av{constructor(e="",t=-1,n=[],s=Td){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=cn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let r=0,o=n.length;r!==o;++r)t.push(Cv(n[r]).scale(s));const a=new this(e.name,e.duration,t,e.blendMode);return a.uuid=e.uuid,a}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let a=0,r=n.length;a!==r;++a)t.push(Mn.toJSON(n[a]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const a=t.length,r=[];for(let o=0;o<a;o++){let l=[],c=[];l.push((o+a-1)%a,o,(o+1)%a),c.push(0,1,0);const h=Mv(l);l=Zc(l,1,h),c=Zc(c,1,h),!s&&l[0]===0&&(l.push(a),c.push(c[0])),r.push(new ls(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},a=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(a);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const r=[];for(const o in s)r.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return r}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,g,_){if(p.length!==0){const m=[],f=[];bu(p,m,f,g),m.length!==0&&_.push(new u(d,m,f))}},s=[],a=e.name||"default",r=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(const _ in p){const m=[],f=[];for(let T=0;T!==d[g].morphTargets.length;++T){const E=d[g];m.push(E.time),f.push(E.morphTarget===_?1:0)}s.push(new ls(".morphTargetInfluence["+_+"]",m,f))}l=p.length*r}else{const p=".bones["+t[u].name+"]";n(hs,p+".position",d,"pos",s),n(cs,p+".quaternion",d,"rot",s),n(hs,p+".scale",d,"scl",s)}}return s.length===0?null:new this(a,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const a=this.tracks[n];t=Math.max(t,a.times[a.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Rv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ls;case"vector":case"vector2":case"vector3":case"vector4":return hs;case"color":return yu;case"quaternion":return cs;case"bool":case"boolean":return ms;case"string":return gs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Cv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Rv(i.type);if(i.times===void 0){const t=[],n=[];bu(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Qn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Lv{constructor(e,t,n){const s=this;let a=!1,r=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,a===!1&&s.onStart!==void 0&&s.onStart(h,r,o),a=!0},this.itemEnd=function(h){r++,s.onProgress!==void 0&&s.onProgress(h,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const Pv=new Lv;class _s{constructor(e){this.manager=e!==void 0?e:Pv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,a){n.load(e,s,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}_s.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ln={};class Iv extends Error{constructor(e,t){super(e),this.response=t}}class xu extends _s{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=Qn.get(e);if(a!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(a),this.manager.itemEnd(e)},0),a;if(Ln[e]!==void 0){Ln[e].push({onLoad:t,onProgress:n,onError:s});return}Ln[e]=[],Ln[e].push({onLoad:t,onProgress:n,onError:s});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Ln[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0;let _=0;const m=new ReadableStream({start(f){T();function T(){u.read().then(({done:E,value:x})=>{if(E)f.close();else{_+=x.byteLength;const U=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let R=0,w=h.length;R<w;R++){const N=h[R];N.onProgress&&N.onProgress(U)}f.enqueue(x),T()}},E=>{f.error(E)})}}});return new Response(m)}else throw new Iv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{Qn.add(e,c);const h=Ln[e];delete Ln[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onLoad&&p.onLoad(c)}}).catch(c=>{const h=Ln[e];if(h===void 0)throw this.manager.itemError(e),c;delete Ln[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Dv extends _s{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,r=Qn.get(e);if(r!==void 0)return a.manager.itemStart(e),setTimeout(function(){t&&t(r),a.manager.itemEnd(e)},0),r;const o=Xs("img");function l(){h(),Qn.add(e,this),t&&t(this),a.manager.itemEnd(e)}function c(u){h(),s&&s(u),a.manager.itemError(e),a.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),a.manager.itemStart(e),o.src=e,o}}class Nv extends _s{constructor(e){super(e)}load(e,t,n,s){const a=new Mt,r=new Dv(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},n,s),a}}class ir extends ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ee(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Uv extends ir{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const kr=new Le,Jc=new A,Qc=new A;class ll{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tl,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new Ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Jc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jc),Qc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qc),t.updateMatrixWorld(),kr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(kr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ov extends ll{constructor(){super(new Rt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=rs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,a=e.distance||t.far;(n!==t.fov||s!==t.aspect||a!==t.far)&&(t.fov=n,t.aspect=s,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Fv extends ir{constructor(e,t,n=0,s=Math.PI/3,a=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.distance=n,this.angle=s,this.penumbra=a,this.decay=r,this.map=null,this.shadow=new Ov}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const eh=new Le,Rs=new A,Br=new A;class kv extends ll{constructor(){super(new Rt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ae(4,2),this._viewportCount=6,this._viewports=[new Ye(2,1,1,1),new Ye(0,1,1,1),new Ye(3,1,1,1),new Ye(1,1,1,1),new Ye(3,0,1,1),new Ye(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,a=e.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),Rs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Rs),Br.copy(n.position),Br.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Br),n.updateMatrixWorld(),s.makeTranslation(-Rs.x,-Rs.y,-Rs.z),eh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(eh)}}class Bv extends ir{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new kv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class zv extends ll{constructor(){super(new nl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Us extends ir{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.shadow=new zv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ks{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Hv extends _s{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,r=Qn.get(e);if(r!==void 0){if(a.manager.itemStart(e),r.then){r.then(c=>{t&&t(c),a.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(r),a.manager.itemEnd(e)},0),r}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(a.options,{colorSpaceConversion:"none"}))}).then(function(c){return Qn.add(e,c),t&&t(c),a.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Qn.remove(e),a.manager.itemError(e),a.manager.itemEnd(e)});Qn.add(e,l),a.manager.itemStart(e)}}class Vv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=th(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=th();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function th(){return performance.now()}const cl="\\[\\]\\.:\\/",Gv=new RegExp("["+cl+"]","g"),hl="[^"+cl+"]",Wv="[^"+cl.replace("\\.","")+"]",Xv=/((?:WC+[\/:])*)/.source.replace("WC",hl),jv=/(WCOD+)?/.source.replace("WCOD",Wv),qv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hl),Yv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hl),$v=new RegExp("^"+Xv+jv+qv+Yv+"$"),Kv=["material","materials","bones","map"];class Zv{constructor(e,t,n){const s=n||Qe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=n.length;s!==a;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Qe{constructor(e,t,n){this.path=t,this.parsedPath=n||Qe.parseTrackName(t),this.node=Qe.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Qe.Composite(e,t,n):new Qe(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Gv,"")}static parseTrackName(e){const t=$v.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const a=n.nodeName.substring(s+1);Kv.indexOf(a)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=a)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(a){for(let r=0;r<a.length;r++){const o=a[r];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,a=n.length;s!==a;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,a=n.length;s!==a;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,a=n.length;s!==a;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,a=n.length;s!==a;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let a=t.propertyIndex;if(e||(e=Qe.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[s];if(r===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[a]!==void 0&&(a=e.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Qe.Composite=Zv;Qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Qe.prototype.GetterByBindingType=[Qe.prototype._getValue_direct,Qe.prototype._getValue_array,Qe.prototype._getValue_arrayElement,Qe.prototype._getValue_toArray];Qe.prototype.SetterByBindingTypeAndVersioning=[[Qe.prototype._setValue_direct,Qe.prototype._setValue_direct_setNeedsUpdate,Qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_array,Qe.prototype._setValue_array_setNeedsUpdate,Qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_arrayElement,Qe.prototype._setValue_arrayElement_setNeedsUpdate,Qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_fromArray,Qe.prototype._setValue_fromArray_setNeedsUpdate,Qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const nh=new Le;class Jv{constructor(e,t,n=0,s=1/0){this.ray=new fs(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new el,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return nh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(nh),this}intersectObject(e,t=!0,n=[]){return Oo(e,this,n,t),n.sort(ih),n}intersectObjects(e,t=!0,n=[]){for(let s=0,a=e.length;s<a;s++)Oo(e[s],this,n,t);return n.sort(ih),n}}function ih(i,e){return i.distance-e.distance}function Oo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const a=i.children;for(let r=0,o=a.length;r<o;r++)Oo(a[r],e,t,!0)}}class sh{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(St(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Qv extends Ti{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xo);function ah(i,e){if(e===Ed)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Po||e===Zh){let t=i.getIndex();if(t===null){const r=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)r.push(l);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Po)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const a=i.clone();return a.setIndex(s),a.clearGroups(),a}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class rh extends _s{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new sb(t)}),this.register(function(t){return new ab(t)}),this.register(function(t){return new pb(t)}),this.register(function(t){return new mb(t)}),this.register(function(t){return new gb(t)}),this.register(function(t){return new ob(t)}),this.register(function(t){return new lb(t)}),this.register(function(t){return new cb(t)}),this.register(function(t){return new hb(t)}),this.register(function(t){return new ib(t)}),this.register(function(t){return new ub(t)}),this.register(function(t){return new rb(t)}),this.register(function(t){return new fb(t)}),this.register(function(t){return new db(t)}),this.register(function(t){return new tb(t)}),this.register(function(t){return new _b(t)}),this.register(function(t){return new vb(t)})}load(e,t,n,s){const a=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const c=ks.extractUrlBase(e);r=ks.resolveURL(c,this.path)}else r=ks.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),a.manager.itemError(e),a.manager.itemEnd(e)},l=new xu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{a.parse(c,r,function(h){t(h),a.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let a;const r={},o={},l=new TextDecoder;if(typeof e=="string")a=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Mu){try{r[ze.KHR_BINARY_GLTF]=new bb(e)}catch(u){s&&s(u);return}a=JSON.parse(r[ze.KHR_BINARY_GLTF].content)}else a=JSON.parse(l.decode(e));else a=e;if(a.asset===void 0||a.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Ib(a,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,r[u.name]=!0}if(a.extensionsUsed)for(let h=0;h<a.extensionsUsed.length;++h){const u=a.extensionsUsed[h],d=a.extensionsRequired||[];switch(u){case ze.KHR_MATERIALS_UNLIT:r[u]=new nb;break;case ze.KHR_DRACO_MESH_COMPRESSION:r[u]=new yb(a,this.dracoLoader);break;case ze.KHR_TEXTURE_TRANSFORM:r[u]=new xb;break;case ze.KHR_MESH_QUANTIZATION:r[u]=new Mb;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(r),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,a){n.parse(e,t,s,a)})}}function eb(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const ze={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class tb{constructor(e){this.parser=e,this.name=ze.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const a=t[n];a.extensions&&a.extensions[this.name]&&a.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,a.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const a=t.json,l=((a.extensions&&a.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ee(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ut);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Us(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Bv(h),c.distance=u;break;case"spot":c=new Fv(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,In(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,a=n.json.nodes[e],o=(a.extensions&&a.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class nb{constructor(){this.name=ze.KHR_MATERIALS_UNLIT}getMaterialType(){return _i}extendParams(e,t,n){const s=[];e.color=new Ee(1,1,1),e.opacity=1;const a=t.pbrMetallicRoughness;if(a){if(Array.isArray(a.baseColorFactor)){const r=a.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],Ut),e.opacity=r[3]}a.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",a.baseColorTexture,gt))}return Promise.all(s)}}class ib{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=s.extensions[this.name].emissiveStrength;return a!==void 0&&(t.emissiveIntensity=a),Promise.resolve()}}class sb{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&a.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&a.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(a.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const o=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ae(o,o)}return Promise.all(a)}}class ab{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=s.extensions[this.name];return t.dispersion=a.dispersion!==void 0?a.dispersion:0,Promise.resolve()}}class rb{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&a.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&a.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(a)}}class ob{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[];t.sheenColor=new Ee(0,0,0),t.sheenRoughness=0,t.sheen=1;const r=s.extensions[this.name];if(r.sheenColorFactor!==void 0){const o=r.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Ut)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&a.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,gt)),r.sheenRoughnessTexture!==void 0&&a.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(a)}}class lb{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&a.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(a)}}class cb{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&a.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;const o=r.attenuationColor||[1,1,1];return t.attenuationColor=new Ee().setRGB(o[0],o[1],o[2],Ut),Promise.all(a)}}class hb{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=s.extensions[this.name];return t.ior=a.ior!==void 0?a.ior:1.5,Promise.resolve()}}class ub{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&a.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));const o=r.specularColorFactor||[1,1,1];return t.specularColor=new Ee().setRGB(o[0],o[1],o[2],Ut),r.specularColorTexture!==void 0&&a.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,gt)),Promise.all(a)}}class db{constructor(e){this.parser=e,this.name=ze.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&a.push(n.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(a)}}class fb{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&a.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(a)}}class pb{constructor(e){this.parser=e,this.name=ze.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const a=s.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,a.source,r)}}class mb{constructor(e){this.parser=e,this.name=ze.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,a=s.textures[e];if(!a.extensions||!a.extensions[t])return null;const r=a.extensions[t],o=s.images[r.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class gb{constructor(e){this.parser=e,this.name=ze.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,a=s.textures[e];if(!a.extensions||!a.extensions[t])return null;const r=a.extensions[t],o=s.images[r.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class _b{constructor(e){this.name=ze.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],a=this.parser.getDependency("buffer",s.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return a.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(p){return p.buffer}):r.ready.then(function(){const p=new ArrayBuffer(h*u);return r.decodeGltfBuffer(new Uint8Array(p),h,u,d,s.mode,s.filter),p})})}else return null}}class vb{constructor(e){this.name=ze.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==Kt.TRIANGLES&&c.mode!==Kt.TRIANGLE_STRIP&&c.mode!==Kt.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=n.extensions[this.name].attributes,o=[],l={};for(const c in r)o.push(this.parser.getDependency("accessor",r[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,p=[];for(const g of u){const _=new Le,m=new A,f=new gn,T=new A(1,1,1),E=new _v(g.geometry,g.material,d);for(let x=0;x<d;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,x),l.SCALE&&T.fromBufferAttribute(l.SCALE,x),E.setMatrixAt(x,_.compose(m,f,T));for(const x in l)if(x==="_COLOR_0"){const U=l[x];E.instanceColor=new No(U.array,U.itemSize,U.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);ct.prototype.copy.call(E,g),this.parser.assignFinalMaterial(E),p.push(E)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const Mu="glTF",Cs=12,oh={JSON:1313821514,BIN:5130562};class bb{constructor(e){this.name=ze.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Cs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Mu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Cs,a=new DataView(e,Cs);let r=0;for(;r<s;){const o=a.getUint32(r,!0);r+=4;const l=a.getUint32(r,!0);if(r+=4,l===oh.JSON){const c=new Uint8Array(e,Cs+r,o);this.content=n.decode(c)}else if(l===oh.BIN){const c=Cs+r;this.body=e.slice(c,c+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class yb{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ze.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,a=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},l={},c={};for(const h in r){const u=Fo[h]||h.toLowerCase();o[u]=r[h]}for(const h in e.attributes){const u=Fo[h]||h.toLowerCase();if(r[h]!==void 0){const d=n.accessors[e.attributes[h]],p=Qi[d.componentType];c[u]=p.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",a).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(p){for(const g in p.attributes){const _=p.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(p)},o,c,Ut,d)})})}}class xb{constructor(){this.name=ze.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Mb{constructor(){this.name=ze.KHR_MESH_QUANTIZATION}}class Su extends $s{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,a=e*s*3+s;for(let r=0;r!==s;r++)t[r]=n[a+r];return t}interpolate_(e,t,n,s){const a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,u=(n-t)/h,d=u*u,p=d*u,g=e*c,_=g-c,m=-2*p+3*d,f=p-d,T=1-m,E=f-d+u;for(let x=0;x!==o;x++){const U=r[_+x+o],R=r[_+x+l]*h,w=r[g+x+o],N=r[g+x]*h;a[x]=T*U+E*R+m*w+f*N}return a}}const Sb=new gn;class Tb extends Su{interpolate_(e,t,n,s){const a=super.interpolate_(e,t,n,s);return Sb.fromArray(a).normalize().toArray(a),a}}const Kt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Qi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},lh={9728:Dt,9729:Wt,9984:Hh,9985:Da,9986:Is,9987:Dn},ch={33071:Jn,33648:Va,10497:is},zr={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Fo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Yn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Eb={CUBICSPLINE:void 0,LINEAR:Ws,STEP:Gs},Hr={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function wb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new nr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:kn})),i.DefaultMaterial}function fi(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function In(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Ab(i,e,t){let n=!1,s=!1,a=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(a=!0),n&&s&&a)break}if(!n&&!s&&!a)return Promise.resolve(i);const r=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;r.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(d)}if(a){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),a&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Rb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Cb(i){let e;const t=i.extensions&&i.extensions[ze.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Vr(t.attributes):e=i.indices+":"+Vr(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Vr(i.targets[n]);return e}function Vr(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function ko(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Lb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Pb=new Le;class Ib{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new eb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,a=!1,r=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,a=o.indexOf("Firefox")>-1,r=a?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||a&&r<98?this.textureLoader=new Nv(this.options.manager):this.textureLoader=new Hv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new xu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,a=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){const o={scene:r[0][s.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:s.asset,parser:n,userData:{}};return fi(a,o,s),In(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,a=t.length;s<a;s++){const r=t[s].joints;for(let o=0,l=r.length;o<l;o++)e[r[o]].isBone=!0}for(let s=0,a=e.length;s<a;s++){const r=e[s];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),a=(r,o)=>{const l=this.associations.get(r);l!=null&&this.associations.set(o,l);for(const[c,h]of r.children.entries())a(h,o.children[c])};return a(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const a=e(t[s]);a&&n.push(a)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(a){return a.loadNode&&a.loadNode(t)});break;case"mesh":s=this._invokeOne(function(a){return a.loadMesh&&a.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(a){return a.loadBufferView&&a.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(a){return a.loadMaterial&&a.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(a){return a.loadTexture&&a.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(a){return a.loadAnimation&&a.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(a){return a!=this&&a.getDependency&&a.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(a,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ze.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(a,r){n.load(ks.resolveURL(t.uri,s.path),a,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,a=t.byteOffset||0;return n.slice(a,a+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const r=zr[s.type],o=Qi[s.componentType],l=s.normalized===!0,c=new o(s.count*r);return Promise.resolve(new Nt(c,r,l))}const a=[];return s.bufferView!==void 0?a.push(this.getDependency("bufferView",s.bufferView)):a.push(null),s.sparse!==void 0&&(a.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),a.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(a).then(function(r){const o=r[0],l=zr[s.type],c=Qi[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(p&&p!==u){const f=Math.floor(d/p),T="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count;let E=t.cache.get(T);E||(_=new c(o,f*p,s.count*p/h),E=new dv(_,p/h),t.cache.add(T,E)),m=new al(E,l,d%p/h,g)}else o===null?_=new c(s.count*l):_=new c(o,d,s.count*l),m=new Nt(_,l,g);if(s.sparse!==void 0){const f=zr.SCALAR,T=Qi[s.sparse.indices.componentType],E=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,U=new T(r[1],E,s.sparse.count*f),R=new c(r[2],x,s.sparse.count*l);o!==null&&(m=new Nt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,N=U.length;w<N;w++){const M=U[w];if(m.setX(M,R[w*l]),l>=2&&m.setY(M,R[w*l+1]),l>=3&&m.setZ(M,R[w*l+2]),l>=4&&m.setW(M,R[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,a=t.textures[e].source,r=t.images[a];let o=this.textureLoader;if(r.uri){const l=n.manager.getHandler(r.uri);l!==null&&(o=l)}return this.loadTextureImage(e,a,o)}loadTextureImage(e,t,n){const s=this,a=this.json,r=a.textures[e],o=a.images[t],l=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=r.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(a.samplers||{})[r.sampler]||{};return h.magFilter=lh[d.magFilter]||Wt,h.minFilter=lh[d.minFilter]||Dn,h.wrapS=ch[d.wrapS]||is,h.wrapT=ch[d.wrapT]||is,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Dt&&h.minFilter!==Wt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,a=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const r=s.images[e],o=self.URL||self.webkitURL;let l=r.uri||"",c=!1;if(r.bufferView!==void 0)l=n.getDependency("bufferView",r.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:r.mimeType});return l=o.createObjectURL(d),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Mt(_);m.needsUpdate=!0,d(m)}),t.load(ks.resolveURL(u,a.path),g,void 0,p)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),In(u,r),u.userData.mimeType=r.mimeType||Lb(r.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const a=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),a.extensions[ze.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[ze.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=a.associations.get(r);r=a.extensions[ze.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),a.associations.set(r,l)}}return s!==void 0&&(r.colorSpace=s),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,a=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new vu,mn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new _u,mn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||a||r){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),a&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),a&&(l.vertexColors=!0),r&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return nr}loadMaterial(e){const t=this,n=this.json,s=this.extensions,a=n.materials[e];let r;const o={},l=a.extensions||{},c=[];if(l[ze.KHR_MATERIALS_UNLIT]){const u=s[ze.KHR_MATERIALS_UNLIT];r=u.getMaterialType(),c.push(u.extendParams(o,a,t))}else{const u=a.pbrMetallicRoughness||{};if(o.color=new Ee(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Ut),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,gt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}a.doubleSided===!0&&(o.side=sn);const h=a.alphaMode||Hr.OPAQUE;if(h===Hr.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Hr.MASK&&(o.alphaTest=a.alphaCutoff!==void 0?a.alphaCutoff:.5)),a.normalTexture!==void 0&&r!==_i&&(c.push(t.assignTexture(o,"normalMap",a.normalTexture)),o.normalScale=new Ae(1,1),a.normalTexture.scale!==void 0)){const u=a.normalTexture.scale;o.normalScale.set(u,u)}if(a.occlusionTexture!==void 0&&r!==_i&&(c.push(t.assignTexture(o,"aoMap",a.occlusionTexture)),a.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=a.occlusionTexture.strength)),a.emissiveFactor!==void 0&&r!==_i){const u=a.emissiveFactor;o.emissive=new Ee().setRGB(u[0],u[1],u[2],Ut)}return a.emissiveTexture!==void 0&&r!==_i&&c.push(t.assignTexture(o,"emissiveMap",a.emissiveTexture,gt)),Promise.all(c).then(function(){const u=new r(o);return a.name&&(u.name=a.name),In(u,a),t.associations.set(u,{materials:e}),a.extensions&&fi(s,u,a),u})}createUniqueName(e){const t=Qe.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function a(o){return n[ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return hh(l,o,t)})}const r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=Cb(c),u=s[h];if(u)r.push(u.promise);else{let d;c.extensions&&c.extensions[ze.KHR_DRACO_MESH_COMPRESSION]?d=a(c):d=hh(new yn,c,t),s[h]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){const t=this,n=this.json,s=this.extensions,a=n.meshes[e],r=a.primitives,o=[];for(let l=0,c=r.length;l<c;l++){const h=r[l].material===void 0?wb(this.cache):this.getDependency("material",r[l].material);o.push(h)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,g=h.length;p<g;p++){const _=h[p],m=r[p];let f;const T=c[p];if(m.mode===Kt.TRIANGLES||m.mode===Kt.TRIANGLE_STRIP||m.mode===Kt.TRIANGLE_FAN||m.mode===void 0)f=a.isSkinnedMesh===!0?new pv(_,T):new xt(_,T),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===Kt.TRIANGLE_STRIP?f.geometry=ah(f.geometry,Zh):m.mode===Kt.TRIANGLE_FAN&&(f.geometry=ah(f.geometry,Po));else if(m.mode===Kt.LINES)f=new vv(_,T);else if(m.mode===Kt.LINE_STRIP)f=new ol(_,T);else if(m.mode===Kt.LINE_LOOP)f=new bv(_,T);else if(m.mode===Kt.POINTS)f=new yv(_,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&Rb(f,a),f.name=t.createUniqueName(a.name||"mesh_"+e),In(f,a),m.extensions&&fi(s,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return a.extensions&&fi(s,u[0],a),u[0];const d=new ln;a.extensions&&fi(s,d,a),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Rt(Wa.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new nl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),In(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,a=t.joints.length;s<a;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const a=s.pop(),r=s,o=[],l=[];for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u){o.push(u);const d=new Le;a!==null&&d.fromArray(a.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new rl(o,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],a=s.name?s.name:"animation_"+e,r=[],o=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const p=s.channels[u],g=s.samplers[p.sampler],_=p.target,m=_.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,T=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(r.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",T)),c.push(g),h.push(_))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],p=u[1],g=u[2],_=u[3],m=u[4],f=[];for(let T=0,E=d.length;T<E;T++){const x=d[T],U=p[T],R=g[T],w=_[T],N=m[T];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const M=n._createAnimationTracks(x,U,R,w,N);if(M)for(let y=0;y<M.length;y++)f.push(M[y])}return new Av(a,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(a){const r=n._getNodeRef(n.meshCache,s.mesh,a);return s.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),r})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],a=n._loadNodeShallow(e),r=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)r.push(n.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([a,Promise.all(r),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,Pb)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const a=t.nodes[e],r=a.name?s.createUniqueName(a.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),a.camera!==void 0&&o.push(s.getDependency("camera",a.camera).then(function(c){return s._getNodeRef(s.cameraCache,a.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(a.isBone===!0?h=new mu:c.length>1?h=new ln:c.length===1?h=c[0]:h=new ct,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(a.name&&(h.userData.name=a.name,h.name=r),In(h,a),a.extensions&&fi(n,h,a),a.matrix!==void 0){const u=new Le;u.fromArray(a.matrix),h.applyMatrix4(u)}else a.translation!==void 0&&h.position.fromArray(a.translation),a.rotation!==void 0&&h.quaternion.fromArray(a.rotation),a.scale!==void 0&&h.scale.fromArray(a.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,a=new ln;n.name&&(a.name=s.createUniqueName(n.name)),In(a,n),n.extensions&&fi(t,a,n);const r=n.nodes||[],o=[];for(let l=0,c=r.length;l<c;l++)o.push(s.getDependency("node",r[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)a.add(l[h]);const c=h=>{const u=new Map;for(const[d,p]of s.associations)(d instanceof mn||d instanceof Mt)&&u.set(d,p);return h.traverse(d=>{const p=s.associations.get(d);p!=null&&u.set(d,p)}),u};return s.associations=c(a),a})}_createAnimationTracks(e,t,n,s,a){const r=[],o=e.name?e.name:e.uuid,l=[];Yn[a.path]===Yn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Yn[a.path]){case Yn.weights:c=ls;break;case Yn.rotation:c=cs;break;case Yn.position:case Yn.scale:c=hs;break;default:switch(n.itemSize){case 1:c=ls;break;case 2:case 3:default:c=hs;break}break}const h=s.interpolation!==void 0?Eb[s.interpolation]:Ws,u=this._getArrayFromAccessor(n);for(let d=0,p=l.length;d<p;d++){const g=new c(l[d]+"."+Yn[a.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),r.push(g)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ko(t.constructor),s=new Float32Array(t.length);for(let a=0,r=t.length;a<r;a++)s[a]=t[a]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof cs?Tb:Su;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Db(i,e,t){const n=e.attributes,s=new Xt;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new A(l[0],l[1],l[2]),new A(c[0],c[1],c[2])),o.normalized){const h=ko(Qi[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const a=e.targets;if(a!==void 0){const o=new A,l=new A;for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const _=ko(Qi[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const r=new bn;s.getCenter(r.center),r.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=r}function hh(i,e,t){const n=e.attributes,s=[];function a(r,o){return t.getDependency("accessor",r).then(function(l){i.setAttribute(o,l)})}for(const r in n){const o=Fo[r]||r.toLowerCase();o in i.attributes||s.push(a(n[r],o))}if(e.indices!==void 0&&!i.index){const r=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(r)}return He.workingColorSpace!==Ut&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${He.workingColorSpace}" not supported.`),In(i,e),Db(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Ab(i,e.targets,t):i})}const uh={type:"change"},ul={type:"start"},Tu={type:"end"},wa=new fs,dh=new $n,Nb=Math.cos(70*Wa.DEG2RAD),mt=new A,kt=2*Math.PI,tt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gr=1e-6;class Ub extends Qv{constructor(e,t=null){super(e,t),this.state=tt.NONE,this.enabled=!0,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$i.ROTATE,MIDDLE:$i.DOLLY,RIGHT:$i.PAN},this.touches={ONE:qi.ROTATE,TWO:qi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new gn,this._lastTargetPosition=new A,this._quat=new gn().setFromUnitVectors(e.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new sh,this._sphericalDelta=new sh,this._scale=1,this._panOffset=new A,this._rotateStart=new Ae,this._rotateEnd=new Ae,this._rotateDelta=new Ae,this._panStart=new Ae,this._panEnd=new Ae,this._panDelta=new Ae,this._dollyStart=new Ae,this._dollyEnd=new Ae,this._dollyDelta=new Ae,this._dollyDirection=new A,this._mouse=new Ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Fb.bind(this),this._onPointerDown=Ob.bind(this),this._onPointerUp=kb.bind(this),this._onContextMenu=Xb.bind(this),this._onMouseWheel=Hb.bind(this),this._onKeyDown=Vb.bind(this),this._onTouchStart=Gb.bind(this),this._onTouchMove=Wb.bind(this),this._onMouseDown=Bb.bind(this),this._onMouseMove=zb.bind(this),this._interceptControlDown=jb.bind(this),this._interceptControlUp=qb.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(uh),this.update(),this.state=tt.NONE}update(e=null){const t=this.object.position;mt.copy(t).sub(this.target),mt.applyQuaternion(this._quat),this._spherical.setFromVector3(mt),this.autoRotate&&this.state===tt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=kt:n>Math.PI&&(n-=kt),s<-Math.PI?s+=kt:s>Math.PI&&(s-=kt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(mt.setFromSpherical(this._spherical),mt.applyQuaternion(this._quatInverse),t.copy(this.target).add(mt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=mt.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),a=!!l}else if(this.object.isOrthographicCamera){const o=new A(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=l!==this.object.zoom;const c=new A(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=mt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(wa.origin.copy(this.object.position),wa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(wa.direction))<Nb?this.object.lookAt(this.target):(dh.setFromNormalAndCoplanarPoint(this.object.up,this.target),wa.intersectPlane(dh,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Gr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gr||this._lastTargetPosition.distanceToSquared(this.target)>Gr?(this.dispatchEvent(uh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?kt/60*this.autoRotateSpeed*e:kt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){mt.setFromMatrixColumn(t,0),mt.multiplyScalar(-e),this._panOffset.add(mt)}_panUp(e,t){this.screenSpacePanning===!0?mt.setFromMatrixColumn(t,1):(mt.setFromMatrixColumn(t,0),mt.crossVectors(this.object.up,mt)),mt.multiplyScalar(e),this._panOffset.add(mt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;mt.copy(s).sub(this.target);let a=mt.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/n.clientHeight,this.object.matrix),this._panUp(2*t*a/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,a=t-n.top,r=n.width,o=n.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(kt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-kt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(kt*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-kt*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(n*n+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ae,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Ob(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Fb(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function kb(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Tu),this.state=tt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Bb(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case $i.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=tt.DOLLY;break;case $i.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=tt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=tt.ROTATE}break;case $i.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=tt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=tt.PAN}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(ul)}function zb(i){switch(this.state){case tt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case tt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case tt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Hb(i){this.enabled===!1||this.enableZoom===!1||this.state!==tt.NONE||(i.preventDefault(),this.dispatchEvent(ul),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Tu))}function Vb(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Gb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case qi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=tt.TOUCH_ROTATE;break;case qi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=tt.TOUCH_PAN;break;default:this.state=tt.NONE}break;case 2:switch(this.touches.TWO){case qi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=tt.TOUCH_DOLLY_PAN;break;case qi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=tt.TOUCH_DOLLY_ROTATE;break;default:this.state=tt.NONE}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(ul)}function Wb(i){switch(this._trackPointer(i),this.state){case tt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case tt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case tt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case tt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=tt.NONE}}function Xb(i){this.enabled!==!1&&i.preventDefault()}function jb(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qb(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class fh extends ct{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ae(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const Hi=new A,ph=new Le,mh=new Le,gh=new A,_h=new A;class Yb{constructor(e={}){const t=this;let n,s,a,r;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),ph.copy(_.matrixWorldInverse),mh.multiplyMatrices(_.projectionMatrix,ph),h(g,g,_),p(g)},this.setSize=function(g,_){n=g,s=_,a=n/2,r=s/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)c(g.children[_])}function h(g,_,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Hi.setFromMatrixPosition(g.matrixWorld),Hi.applyMatrix4(mh);const f=Hi.z>=-1&&Hi.z<=1&&g.layers.test(m.layers)===!0,T=g.element;T.style.display=f===!0?"":"none",f===!0&&(g.onBeforeRender(t,_,m),T.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Hi.x*a+a)+"px,"+(-Hi.y*r+r)+"px)",T.parentNode!==l&&l.appendChild(T),g.onAfterRender(t,_,m));const E={distanceToCameraSquared:u(m,g)};o.objects.set(g,E)}for(let f=0,T=g.children.length;f<T;f++)h(g.children[f],_,m)}function u(g,_){return gh.setFromMatrixPosition(g.matrixWorld),_h.setFromMatrixPosition(_.matrixWorld),gh.distanceToSquared(_h)}function d(g){const _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function p(g){const _=d(g).sort(function(f,T){if(f.renderOrder!==T.renderOrder)return T.renderOrder-f.renderOrder;const E=o.objects.get(f).distanceToCameraSquared,x=o.objects.get(T).distanceToCameraSquared;return E-x}),m=_.length;for(let f=0,T=_.length;f<T;f++)_[f].element.style.zIndex=m-f}}}const vh={color:13164021,emissive:6000324,emissiveIntensity:.45,opacity:.34},Aa={color:16777215,emissive:15266047,emissiveIntensity:.55,opacity:1},bh={color:10405096,emissive:3825800,emissiveIntensity:.2,opacity:.18},Ls={color:15239578,emissive:11024978,emissiveIntensity:.38,opacity:.28},Ra={color:16765144,emissive:16747162,emissiveIntensity:.72,opacity:.95},Ca={color:12110044,emissive:3821680,emissiveIntensity:.12,opacity:.12},$b={color:15326408,emissive:0,emissiveIntensity:0,roughness:.62,metalness:.04},Kb={color:16773600,emissive:5913112,emissiveIntensity:.16,roughness:.52,metalness:.05},Zb={color:10699848,emissive:0,emissiveIntensity:0,roughness:.72,metalness:.02},Jb={color:12868190,emissive:4853780,emissiveIntensity:.18,roughness:.62,metalness:.03},Vi={color:14207926,emissive:0,emissiveIntensity:0,roughness:.55,metalness:.02,opacity:.92},Qb=.13,ey=.1,ty=.5,yh=.28,xh=.8,Ps={x:-Math.PI/2,y:0,z:0};function Mh(i){return i.startsWith("vertebra_")?null:/_l\d+$/.test(i)||i.endsWith("_l")?"l":/_r\d+$/.test(i)||i.endsWith("_r")?"r":null}class ny{constructor(e){Ie(this,"mainCanvas");Ie(this,"renderer");Ie(this,"scene");Ie(this,"camera");Ie(this,"controls");Ie(this,"spin",new ln);Ie(this,"body",new ln);Ie(this,"meshByName",new Map);Ie(this,"materials",new Map);Ie(this,"kindByName",new Map);Ie(this,"targetIds",new Set);Ie(this,"subject","bones");Ie(this,"spinning",!0);Ie(this,"disposed",!1);Ie(this,"sideViews",[]);Ie(this,"clock",new Vv);Ie(this,"fitRadius",1);Ie(this,"focusTarget",new A);Ie(this,"focusDist",6);Ie(this,"lastUprightEuler",{...Ps});Ie(this,"lastBboxSize",new A);Ie(this,"hemiLight");Ie(this,"keyLight");Ie(this,"fillLight");Ie(this,"rimLight");Ie(this,"bounceLight");Ie(this,"quizFog");Ie(this,"labelRenderer");Ie(this,"markerGroup",new ln);Ie(this,"viewMode",!1);Ie(this,"viewSelected",new Set);Ie(this,"raycaster",new Jv);Ie(this,"pointerNdc",new Ae);Ie(this,"_scratchA",new A);Ie(this,"_scratchB",new A);Ie(this,"viewFrame",null);Ie(this,"musclesLoaded",!1);Ie(this,"musclesLoading",null);Ie(this,"muscleUrls",[]);Ie(this,"resize",()=>{var s,a;const e=this.mainCanvas.parentElement,t=(e==null?void 0:e.clientWidth)||window.innerWidth,n=(e==null?void 0:e.clientHeight)||window.innerHeight;this.camera.aspect=t/Math.max(n,1),this.camera.updateProjectionMatrix(),this.renderer.setSize(t,n,!1),this.labelRenderer.setSize(t,n);for(const r of this.sideViews){const o=((s=r.canvas.parentElement)==null?void 0:s.clientWidth)||120,l=((a=r.canvas.parentElement)==null?void 0:a.clientHeight)||180;r.camera.aspect=o/Math.max(l,1),r.camera.updateProjectionMatrix(),r.renderer.setSize(o,l,!1)}});Ie(this,"animate",()=>{if(this.disposed)return;requestAnimationFrame(this.animate);const e=this.clock.getDelta();this.spinning&&(this.spin.rotation.y+=e*.22),this.tickViewFrame(e),this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera);for(const t of this.sideViews)t.renderer.render(this.scene,t.camera)});var t;if(this.mainCanvas=e.mainCanvas,this.scene=new uv,this.scene.background=new Ee(725536),this.quizFog=new sl(725536,10,36),this.scene.fog=this.quizFog,this.camera=new Rt(38,1,.05,200),this.camera.up.set(0,1,0),this.camera.position.set(0,1,8),this.renderer=new Oc({canvas:e.mainCanvas,antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=gt,this.renderer.toneMapping=Bh,this.renderer.toneMappingExposure=1.15,this.controls=new Ub(this.camera,this.mainCanvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enablePan=!1,this.controls.minDistance=xh,this.controls.maxDistance=24,this.controls.minPolarAngle=.15,this.controls.maxPolarAngle=Math.PI-.15,this.controls.addEventListener("start",()=>{this.spinning=!1,this.cancelViewFrame()}),this.controls.addEventListener("end",()=>{window.setTimeout(()=>{!this.disposed&&!this.viewMode&&(this.spinning=!0)},1800)}),this.hemiLight=new Uv(13624575,1712176,1.1),this.scene.add(this.hemiLight),this.keyLight=new Us(16777215,1.25),this.keyLight.position.set(3,8,5),this.scene.add(this.keyLight),this.fillLight=new Us(8956620,.5),this.fillLight.position.set(-5,2,-3),this.scene.add(this.fillLight),this.rimLight=new Us(11193599,.35),this.rimLight.position.set(0,2,-8),this.scene.add(this.rimLight),this.bounceLight=new Us(15786184,0),this.bounceLight.position.set(0,-6,2),this.scene.add(this.bounceLight),this.spin.name="spinY",this.body.name="bodyUpright",this.spin.add(this.body),this.scene.add(this.spin),this.markerGroup.name="viewMarkers",this.scene.add(this.markerGroup),this.labelRenderer=new Yb,this.labelRenderer.domElement.className="label-layer",this.labelRenderer.domElement.style.pointerEvents="none",(t=this.mainCanvas.parentElement)==null||t.appendChild(this.labelRenderer.domElement),e.sideCanvases)for(const n of e.sideCanvases){const s=new Oc({canvas:n,antialias:!0,alpha:!0,powerPreference:"low-power"});s.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),s.setClearColor(0,0),s.outputColorSpace=gt;const a=new Rt(32,1,.05,200);a.up.set(0,1,0),this.sideViews.push({canvas:n,renderer:s,camera:a})}this.resize(),window.addEventListener("resize",this.resize),this.animate()}async load(e){const t=new rh;this.body.clear(),this.meshByName.clear(),this.materials.clear(),this.kindByName.clear(),this.musclesLoaded=!1;const n=await fetch(ji("models/extra/manifest.json")).then(a=>a.json()).then(a=>a.map(r=>ji(r))).catch(()=>[]);if(this.muscleUrls=await fetch(ji("models/extra/muscles/manifest.json")).then(a=>a.json()).then(a=>a.map(r=>ji(r))).catch(()=>[]),n.length===0)throw new Error("No skeleton meshes in /models/extra/manifest.json");const s=24;for(let a=0;a<n.length;a+=s){const r=n.slice(a,a+s),o=await Promise.all(r.map(l=>this.loadOne(t,l,"bone")));for(const l of o)l&&(this.ingestModel(l,"bone"),this.body.add(l))}this.applyDeterministicUpright(),this.setSubject("bones"),this.frameFullBody(),this.updateSideCameras(),console.info("[skeleton] bones ready",this.meshByName.size,"upright deg",{x:this.lastUprightEuler.x*180/Math.PI,y:this.lastUprightEuler.y*180/Math.PI,z:this.lastUprightEuler.z*180/Math.PI},"bbox",this.lastBboxSize.toArray().map(a=>+a.toFixed(3))),this.ensureMusclesLoaded()}async loadOne(e,t,n){var s;try{const a=await e.loadAsync(t),r=((s=t.split("/").pop())==null?void 0:s.replace(/\.glb$/i,""))||"";return a.scene.traverse(o=>{o instanceof xt&&r&&(o.name=r,o.userData.kind=n)}),a.scene}catch(a){return console.warn("Failed to load",t,a),null}}async ensureMusclesLoaded(){if(!this.musclesLoaded){if(this.musclesLoading)return this.musclesLoading;if(this.muscleUrls.length===0){this.musclesLoaded=!0;return}this.musclesLoading=this.loadMusclesInternal(),await this.musclesLoading}}async loadMusclesInternal(){const e=new rh,t=12;for(let n=0;n<this.muscleUrls.length;n+=t){const s=this.muscleUrls.slice(n,n+t),a=await Promise.all(s.map(r=>this.loadOne(e,r,"muscle")));for(const r of a)r&&(this.ingestModel(r,"muscle"),this.body.add(r),r.traverse(o=>{o instanceof xt&&(o.visible=this.viewMode||this.subject==="muscles")}))}this.musclesLoaded=!0,this.viewMode?this.applyViewPresentation():this.applySubjectVisibility(),console.info("[skeleton] muscles ready",[...this.kindByName.values()].filter(n=>n==="muscle").length)}ingestModel(e,t="bone"){e.traverse(n=>{var h;if(!(n instanceof xt))return;const s=n.name||((h=n.parent)==null?void 0:h.name)||"";if(!s)return;n.geometry.computeVertexNormals();const a=s.startsWith("cartilage_"),r=s==="diaphragm",o=t==="muscle"||n.userData.kind==="muscle"?"muscle":"bone",l=o==="muscle"?Ls:a||r?bh:vh,c=new nr({color:l.color,emissive:l.emissive,emissiveIntensity:l.emissiveIntensity,transparent:!0,opacity:l.opacity,metalness:o==="muscle"?.05:.15,roughness:o==="muscle"?.55:.35,side:sn,depthWrite:!1});n.material=c,n.renderOrder=o==="muscle"?2:r?0:1,r&&(c.opacity=.08,c.emissiveIntensity=.05),this.meshByName.has(s)||(this.meshByName.set(s,n),this.materials.set(s,c),this.kindByName.set(s,o))})}applyDeterministicUpright(){this.spin.rotation.set(0,0,0),this.body.position.set(0,0,0),this.body.scale.set(1,1,1),this.body.rotation.set(Ps.x,Ps.y,Ps.z),this.lastUprightEuler={...Ps},this.body.updateMatrixWorld(!0);const e=new Xt().setFromObject(this.body),t=e.getSize(new A),n=e.getCenter(new A);this.lastBboxSize.copy(t);const a=4.2/Math.max(t.y,1e-6);this.body.scale.setScalar(a),this.body.position.set(-n.x*a,-n.y*a,-n.z*a),this.body.updateMatrixWorld(!0);const r=new Xt().setFromObject(this.body);this.lastBboxSize.copy(r.getSize(new A)),this.fitRadius=Math.max(this.lastBboxSize.y*.5,1),(this.lastBboxSize.y<this.lastBboxSize.x*1.2||this.lastBboxSize.y<this.lastBboxSize.z*1.2)&&console.warn("[skeleton] upright sanity failed — Y not dominant",this.lastBboxSize.toArray())}frameFullBody(){this.cancelViewFrame(),this.focusTarget.set(0,0,0),this.focusDist=this.fitRadius/Math.tan(this.camera.fov*Math.PI/360)*1.55,this.camera.up.set(0,1,0),this.camera.position.set(this.focusDist*.35,this.fitRadius*.15,this.focusDist),this.camera.near=.05,this.camera.far=200,this.camera.updateProjectionMatrix(),this.controls.target.copy(this.focusTarget),this.controls.update()}setSubject(e){this.subject=e,e==="muscles"&&this.ensureMusclesLoaded().then(()=>this.applySubjectVisibility()),this.applySubjectVisibility()}async setSubjectAsync(e){this.subject=e,e==="muscles"&&await this.ensureMusclesLoaded(),this.applySubjectVisibility()}applySubjectVisibility(){for(const[e,t]of this.materials){const n=this.kindByName.get(e)??"bone",s=this.meshByName.get(e);if(s){if(this.subject==="bones"){if(s.visible=n==="bone",n==="bone"){const r=e.startsWith("cartilage_")?bh:vh;t.color.setHex(r.color),t.emissive.setHex(r.emissive),t.emissiveIntensity=r.emissiveIntensity,t.opacity=r.opacity,t.depthWrite=!1,s.renderOrder=1}}else s.visible=!0,n==="muscle"?(t.color.setHex(Ls.color),t.emissive.setHex(Ls.emissive),t.emissiveIntensity=Ls.emissiveIntensity,t.opacity=Ls.opacity,t.depthWrite=!1,s.renderOrder=2):(t.color.setHex(Ca.color),t.emissive.setHex(Ca.emissive),t.emissiveIntensity=Ca.emissiveIntensity,t.opacity=Ca.opacity,t.depthWrite=!1,s.renderOrder=0);t.needsUpdate=!0}}}setTarget(e){this.targetIds=new Set(e),this.applySubjectVisibility();for(const[t,n]of this.materials){const s=this.kindByName.get(t)??"bone",a=this.meshByName.get(t);if(!a||!a.visible)continue;this.targetIds.has(t)&&(s==="muscle"?(n.color.setHex(Ra.color),n.emissive.setHex(Ra.emissive),n.emissiveIntensity=Ra.emissiveIntensity,n.opacity=Ra.opacity):(n.color.setHex(Aa.color),n.emissive.setHex(Aa.emissive),n.emissiveIntensity=Aa.emissiveIntensity,n.opacity=Aa.opacity),n.transparent=!0,n.depthWrite=!0,a.renderOrder=10),n.needsUpdate=!0}this.frameMeshes(e)}frameMeshes(e){const t=new Xt;let n=!1;for(const l of e){const c=this.meshByName.get(l);c&&(t.expandByObject(c),n=!0)}if(!n){this.frameFullBody(),this.updateSideCameras();return}const s=t.getCenter(new A),a=t.getSize(new A),r=Math.max(a.x,a.y,a.z,.12)*.5,o=Math.max(r/Math.tan(this.camera.fov*Math.PI/360)*2.6,1.4);this.focusTarget.copy(s),this.focusDist=o,this.camera.up.set(0,1,0),this.camera.position.set(s.x+o*.25,s.y+r*.2,s.z+o),this.controls.target.copy(s),this.controls.update(),this.updateSideCamerasAround(s,o)}updateSideCameras(){this.updateSideCamerasAround(this.focusTarget,Math.max(this.fitRadius*2.2,3))}updateSideCamerasAround(e,t){this.sideViews.length!==0&&(this.sideViews[0]&&(this.sideViews[0].camera.up.set(0,1,0),this.sideViews[0].camera.position.set(e.x,e.y,e.z+t),this.sideViews[0].camera.lookAt(e),this.sideViews[0].camera.updateProjectionMatrix()),this.sideViews[1]&&(this.sideViews[1].camera.up.set(0,1,0),this.sideViews[1].camera.position.set(e.x-t,e.y,e.z),this.sideViews[1].camera.lookAt(e),this.sideViews[1].camera.updateProjectionMatrix()))}freezeUprightProof(){this.spinning=!1,this.spin.rotation.y=0,this.frameFullBody(),this.camera.up.set(0,1,0),this.camera.position.set(0,this.fitRadius*.05,this.focusDist*1.05),this.controls.target.set(0,0,0),this.controls.update(),this.updateSideCamerasAround(new A(0,0,0),this.focusDist*.9)}showMenuView(){this.frameFullBody(),this.spinning=!0}listMeshNames(){return[...this.meshByName.keys()].sort()}isViewMode(){return this.viewMode}async enterView(){this.viewMode=!0,this.spinning=!1,this.spin.rotation.y=0,this.controls.minDistance=yh,this.viewSelected.clear(),this.clearViewMarkers(),this.applyViewLighting(!0),await this.ensureMusclesLoaded(),!(!this.viewMode||this.disposed)&&(this.applyViewPresentation(),this.frameFullBody())}exitView(){this.viewMode&&(this.viewMode=!1,this.cancelViewFrame(),this.controls.minDistance=xh,this.viewSelected.clear(),this.clearViewMarkers(),this.applyViewLighting(!1),this.spinning=!0,this.applySubjectVisibility())}clearViewSelection(){this.setViewSelection(null)}setViewSelection(e,t){this.viewSelected=new Set(e??[]),this.clearViewMarkers(),this.viewMode&&(this.applyViewPresentation(),this.viewSelected.size>0&&t&&t.length>0&&this.placeAttachmentMarkers(t))}pickAt(e,t){return this.pickAllAt(e,t)[0]??null}pickAllAt(e,t){const n=this.mainCanvas.getBoundingClientRect();if(n.width<=0||n.height<=0)return[];this.pointerNdc.set((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.pointerNdc,this.camera);const s=[];for(const u of this.meshByName.values())u.visible&&s.push(u);const a=this.raycaster.intersectObjects(s,!1),r=[],o=new Set;for(const u of a){const d=u.object;if(!(d instanceof xt)||d.userData.isViewMarker)continue;const p=d.name;if(!p||o.has(p)||p==="diaphragm"||p.startsWith("cartilage_"))continue;const g=this.kindByName.get(p);g!=="bone"&&g!=="muscle"||(o.add(p),r.push({meshName:p,kind:g,distance:u.distance}))}if(r.length===0)return[];const l=r[0],c=Mh(l.meshName),h=[l];for(let u=1;u<r.length;u++){const d=r[u];if(d.distance-l.distance>ty)break;const p=Mh(d.meshName);c&&p&&p!==c||h.push(d)}return h}frameViewSelection(e){if(!this.viewMode||e.length===0)return;this.body.updateMatrixWorld(!0);const t=new Xt;let n=!1;for(const g of e){const _=this.meshByName.get(g);_&&(t.expandByObject(_),n=!0)}if(!n)return;const s=t.getCenter(new A),a=t.getSize(new A),r=Math.max(a.x,a.y,a.z,.08)*.5,o=Math.tan(this.camera.fov*Math.PI/360),l=Wa.lerp(2.05,2.7,Wa.smoothstep(r,.05,.35)),c=Math.max(r/o*l,yh+.06),h=this.controls.target.clone(),u=this.camera.position.clone(),d=u.clone().sub(h);d.lengthSq()<1e-8&&d.set(.25,.15,1),d.setLength(c);const p=s.clone().add(d);this.focusTarget.copy(s),this.focusDist=c,this.camera.up.set(0,1,0),this.viewFrame={startTarget:h,endTarget:s,startPos:u,endPos:p,elapsed:0,duration:.5}}cancelViewFrame(){this.viewFrame=null}tickViewFrame(e){const t=this.viewFrame;if(!t)return;t.elapsed+=e;const n=Math.min(1,t.elapsed/t.duration),s=n*n*(3-2*n);this.controls.target.lerpVectors(t.startTarget,t.endTarget,s),this.camera.position.lerpVectors(t.startPos,t.endPos,s),this.camera.up.set(0,1,0),n>=1&&(this.viewFrame=null)}applyViewLighting(e){e?(this.scene.background=new Ee(1053724),this.scene.fog=null,this.hemiLight.color.setHex(15920356),this.hemiLight.groundColor.setHex(2761756),this.hemiLight.intensity=.95,this.keyLight.color.setHex(16774890),this.keyLight.intensity=1.45,this.keyLight.position.set(4.2,7.2,5.5),this.fillLight.color.setHex(12109012),this.fillLight.intensity=.62,this.fillLight.position.set(-5.5,3,-2),this.rimLight.color.setHex(14214388),this.rimLight.intensity=.48,this.rimLight.position.set(-1,3.5,-8),this.bounceLight.intensity=.28,this.renderer.toneMappingExposure=1.05):(this.scene.background=new Ee(725536),this.scene.fog=this.quizFog,this.hemiLight.color.setHex(13624575),this.hemiLight.groundColor.setHex(1712176),this.hemiLight.intensity=1.1,this.keyLight.color.setHex(16777215),this.keyLight.intensity=1.25,this.keyLight.position.set(3,8,5),this.fillLight.color.setHex(8956620),this.fillLight.intensity=.5,this.fillLight.position.set(-5,2,-3),this.rimLight.color.setHex(11193599),this.rimLight.intensity=.35,this.rimLight.position.set(0,2,-8),this.bounceLight.intensity=0,this.renderer.toneMappingExposure=1.15)}applyViewPresentation(){const e=this.viewSelected.size>0;for(const[t,n]of this.materials){const s=this.kindByName.get(t)??"bone",a=this.meshByName.get(t);if(!a)continue;const r=t.startsWith("cartilage_"),o=t==="diaphragm",l=e&&this.viewSelected.has(t);if(o){a.visible=!0,n.color.setHex(9071210),n.emissive.setHex(0),n.emissiveIntensity=0,n.transparent=!0,n.opacity=e?.04:.14,n.depthWrite=!1,n.roughness=.8,n.metalness=0,a.renderOrder=0,n.needsUpdate=!0;continue}a.visible=!0;const c=e&&!l;if(s==="muscle"){const h=l?Jb:Zb;n.color.setHex(h.color),n.emissive.setHex(h.emissive),n.emissiveIntensity=h.emissiveIntensity,n.roughness=h.roughness,n.metalness=h.metalness,n.transparent=c,n.opacity=c?ey:1,n.depthWrite=!c,a.renderOrder=l?10:2}else if(r)n.color.setHex(Vi.color),n.emissive.setHex(Vi.emissive),n.emissiveIntensity=Vi.emissiveIntensity,n.roughness=Vi.roughness,n.metalness=Vi.metalness,n.transparent=!0,n.opacity=c?.06:Vi.opacity,n.depthWrite=!c,a.renderOrder=1;else{const h=l?Kb:$b;n.color.setHex(h.color),n.emissive.setHex(h.emissive),n.emissiveIntensity=h.emissiveIntensity,n.roughness=h.roughness,n.metalness=h.metalness,n.transparent=c,n.opacity=c?Qb:1,n.depthWrite=!c,a.renderOrder=l?10:1}n.needsUpdate=!0}}clearViewMarkers(){var t;const e=[];this.markerGroup.traverse(n=>{n instanceof fh&&e.push(n)});for(const n of e)(t=n.parent)==null||t.remove(n),n.element.remove();for(;this.markerGroup.children.length>0;){const n=this.markerGroup.children[0];if(this.markerGroup.remove(n),n instanceof xt){n.geometry.dispose();const s=n.material;Array.isArray(s)?s.forEach(a=>a.dispose()):s.dispose()}}}placeAttachmentMarkers(e){this.body.updateMatrixWorld(!0);for(const t of e){const n=this.nearestAttachmentPoint(t.muscleMeshes,t.boneMeshes,t.prefer);if(!n){console.warn("[view] no attachment point for",t.label,t.muscleMeshes,t.boneMeshes);continue}this.addMarker(n.point,n.outward,t.kind,t.label)}}nearestAttachmentPoint(e,t,n){const s=this.sampleMeshes(e,2200),a=this.sampleMeshes(t,2200);if(s.length===0&&a.length===0)return null;if(s.length>0&&a.length>0){let u=1/0;const d=new Array(a.length),p=new Float64Array(a.length);p.fill(1/0);for(const U of s)for(let R=0;R<a.length;R++){const w=U.distanceToSquared(a[R]);w<p[R]&&(p[R]=w,d[R]=U),w<u&&(u=w)}const g=Math.max(u,.018*.018),_=u+g;let m=a[0],f=d[0]??s[0],T=-1/0;for(let U=0;U<a.length;U++){if(p[U]>_)continue;const R=a[U],w=n?this.preferScore(R,n):-p[U];w>T&&(T=w,m=R,f=d[U]??f)}const E=this._scratchA.copy(f).sub(m);return E.lengthSq()<1e-8?E.set(0,1,0):E.normalize(),{point:m.clone().addScaledVector(E,.028),outward:E.clone()}}const r=s.length>0?s:a,o=this._scratchA.set(0,0,0);for(const u of r)o.add(u);o.divideScalar(r.length);let l=r[0],c=-1;for(const u of r){const d=u.distanceToSquared(o);d>c&&(c=d,l=u)}const h=this._scratchB.copy(l).sub(o);return h.lengthSq()<1e-8?h.set(0,1,0):h.normalize(),{point:l.clone().addScaledVector(h,.028),outward:h.clone()}}preferScore(e,t){switch(t){case"cranial":return e.y;case"caudal":return-e.y;case"anterior":return e.z;case"posterior":return-e.z;case"lateral":return Math.abs(e.x);case"medial":return-Math.abs(e.x)}}sampleMeshes(e,t){const n=[];for(const r of e){const o=this.meshByName.get(r);o&&n.push(o)}if(n.length===0)return[];const s=Math.max(80,Math.floor(t/n.length)),a=[];for(const r of n){const o=r.geometry.getAttribute("position");if(!o)continue;r.updateWorldMatrix(!0,!1);const l=o.count,c=Math.max(1,Math.ceil(l/s));for(let h=0;h<l;h+=c){const u=new A().fromBufferAttribute(o,h);r.localToWorld(u),a.push(u)}}return a}addMarker(e,t,n,s){const a=new ln;a.position.copy(e);const r=document.createElement("div");r.className=`view-pin view-pin--${n}`,r.textContent=s,r.style.pointerEvents="none";const o=new fh(r);o.position.copy(t).multiplyScalar(.05),a.add(o),this.markerGroup.add(a)}dispose(){this.disposed=!0,this.cancelViewFrame(),window.removeEventListener("resize",this.resize),this.clearViewMarkers(),this.controls.dispose(),this.renderer.dispose(),this.labelRenderer.domElement.remove();for(const e of this.sideViews)e.renderer.dispose()}}let Wr=null;function sr(){return Wr||(Wr=new AudioContext),Wr}async function jt(){const i=sr();i.state==="suspended"&&await i.resume()}function iy(i,e){const t=Math.max(1,Math.floor(i.sampleRate*e)),n=i.createBuffer(1,t,i.sampleRate),s=n.getChannelData(0);for(let a=0;a<t;a++)s[a]=Math.random()*2-1;return n}function Eu(){const i=sr();i.state==="suspended"&&i.resume();const e=i.currentTime,t=i.createGain();t.gain.setValueAtTime(1,e),t.connect(i.destination);const n=i.createOscillator(),s=i.createGain();n.type="sine",n.frequency.setValueAtTime(180,e),n.frequency.exponentialRampToValueAtTime(70,e+.045),s.gain.setValueAtTime(1e-4,e),s.gain.exponentialRampToValueAtTime(.38,e+.004),s.gain.exponentialRampToValueAtTime(1e-4,e+.055),n.connect(s),s.connect(t),n.start(e),n.stop(e+.07);const a=i.createOscillator(),r=i.createGain();a.type="triangle",a.frequency.setValueAtTime(420,e),a.frequency.exponentialRampToValueAtTime(140,e+.03),r.gain.setValueAtTime(1e-4,e),r.gain.exponentialRampToValueAtTime(.22,e+.003),r.gain.exponentialRampToValueAtTime(1e-4,e+.04),a.connect(r),r.connect(t),a.start(e),a.stop(e+.05);const o=i.createBufferSource();o.buffer=iy(i,.04);const l=i.createBiquadFilter();l.type="bandpass",l.frequency.setValueAtTime(3800,e),l.Q.setValueAtTime(4.5,e);const c=i.createBiquadFilter();c.type="highpass",c.frequency.setValueAtTime(2200,e);const h=i.createGain();h.gain.setValueAtTime(1e-4,e),h.gain.exponentialRampToValueAtTime(.28,e+.0015),h.gain.exponentialRampToValueAtTime(1e-4,e+.022),o.connect(c),c.connect(l),l.connect(h),h.connect(t),o.start(e),o.stop(e+.03)}function sy(){const i=sr();i.state==="suspended"&&i.resume();const e=i.currentTime,t=i.createGain();t.gain.setValueAtTime(.55,e),t.connect(i.destination),[523.25,659.25].forEach((s,a)=>{const r=e+a*.045,o=i.createOscillator(),l=i.createGain();o.type="sine",o.frequency.setValueAtTime(s,r),l.gain.setValueAtTime(1e-4,r),l.gain.exponentialRampToValueAtTime(.09,r+.02),l.gain.exponentialRampToValueAtTime(1e-4,r+.22),o.connect(l),l.connect(t),o.start(r),o.stop(r+.28)})}function wu(){const i=sr();i.state==="suspended"&&i.resume();const e=i.currentTime,t=i.createGain();t.gain.setValueAtTime(.7,e),t.connect(i.destination);const n=i.createOscillator(),s=i.createGain();n.type="triangle",n.frequency.setValueAtTime(220,e),n.frequency.exponentialRampToValueAtTime(110,e+.08),s.gain.setValueAtTime(1e-4,e),s.gain.exponentialRampToValueAtTime(.14,e+.008),s.gain.exponentialRampToValueAtTime(1e-4,e+.12),n.connect(s),s.connect(t),n.start(e),n.stop(e+.14)}const ie=(i,e)=>e.map(t=>`${t}_${i}`),La=(i,e,t)=>{const n=[];for(let s=e;s<=t;s++)n.push(`rib_${i}${s}`);return n},Sh=(...i)=>i.map(e=>`vertebra_${e}`),ay={trapezius:{id:"trapezius",description:"A broad, diamond-shaped superficial muscle of the posterior neck and upper back, with descending (upper), transverse (middle), and ascending (lower) parts. It links the axial skeleton to the pectoral girdle and helps position the scapula for arm movement.",origin:"Medial third of the superior nuchal line and the external occipital protuberance, the ligamentum nuchae, and the spinous processes of C7–T12 (with the intervening supraspinous ligaments). Descending fibers arise more cranially; ascending fibers arise from the lower thoracic spines.",insertion:"Lateral third of the clavicle (descending fibers), the acromion (mainly transverse fibers), and the spine of the scapula (transverse and ascending fibers).",action:"Descending part elevates the scapula and assists upward rotation of the glenoid; transverse part retracts the scapula; ascending part depresses the scapula. Together they steady the scapula for upper-limb movement. Acting on the head and neck, it can extend the neck (bilateral) and contribute to contralateral rotation / ipsilateral lateral flexion (unilateral).",innervation:"Spinal accessory nerve (CN XI) for motor innervation; proprioceptive fibers travel via the anterior rami of C3–C4.",sitesForSide:i=>[{kind:"origin",label:"Origin · upper",muscleMeshes:ie(i,["trap_desc"]),boneMeshes:["occipital"],prefer:"cranial"},{kind:"origin",label:"Origin · lower",muscleMeshes:ie(i,["trap_asc"]),boneMeshes:Sh("t8","t9","t10","t11","t12"),prefer:"caudal"},{kind:"insertion",label:"Insertion · clavicle",muscleMeshes:ie(i,["trap_desc"]),boneMeshes:ie(i,["clavicle"]),prefer:"lateral"},{kind:"insertion",label:"Insertion · scapula",muscleMeshes:ie(i,["trap_trans","trap_asc"]),boneMeshes:ie(i,["scapula"]),prefer:"posterior"}]},sternocleidomastoid:{id:"sternocleidomastoid",description:"A prominent two-headed muscle on the side of the neck, running from the sternum and clavicle to the mastoid process. It divides the neck into anterior and posterior triangles and is an important landmark for the carotid sheath and accessory nerve.",origin:"Sternal head: anterior surface of the manubrium of the sternum. Clavicular head: superior surface of the medial third of the clavicle. The two heads bound a small triangular interval, with the clavicular head lying lateral and slightly deeper.",insertion:"Lateral surface of the mastoid process of the temporal bone, and the lateral half of the superior nuchal line of the occipital bone.",action:"Unilateral contraction tilts the head to the same side and rotates the face to the opposite side. Bilateral contraction flexes the cervical spine relative to the thorax and can extend the head at the atlanto-occipital joint; with the head fixed it also acts as an accessory muscle of inspiration by lifting the sternum and clavicle.",innervation:"Spinal accessory nerve (CN XI) for motor innervation; proprioceptive (and some sensory) fibers from C2–C3, including the cervical plexus.",sitesForSide:i=>[{kind:"origin",label:"Origin · sternal",muscleMeshes:[`scm_${i}`],boneMeshes:["sternum_manubrium"],prefer:"anterior"},{kind:"origin",label:"Origin · clavicular",muscleMeshes:[`scm_${i}`],boneMeshes:ie(i,["clavicle"]),prefer:"medial"},{kind:"insertion",label:"Insertion · mastoid",muscleMeshes:[`scm_${i}`],boneMeshes:ie(i,["temporal"]),prefer:"lateral"}]},deltoid:{id:"deltoid",description:"The thick, triangular muscle that caps the shoulder, with clavicular (anterior), acromial (middle), and spinal (posterior) parts. It gives the shoulder its rounded contour and is the principal abductor of the arm once the motion is under way.",origin:"Anterior part: lateral third of the clavicle (anterior border). Middle part: lateral margin of the acromion. Posterior part: spine of the scapula (inferior lip). These origins continue the insertion line of trapezius.",insertion:"Deltoid tuberosity on the lateral surface of the humeral shaft, about mid-arm.",action:"The acromial part is the chief abductor of the arm (supraspinatus initiates the first degrees). The clavicular part flexes and medially rotates the arm; the spinal part extends and laterally rotates it. Anterior and posterior parts can also stabilize the humeral head during abduction.",innervation:"Axillary nerve (C5–C6), from the posterior cord of the brachial plexus.",sitesForSide:i=>[{kind:"origin",label:"Origin · clavicular",muscleMeshes:ie(i,["delt_clav"]),boneMeshes:ie(i,["clavicle"])},{kind:"origin",label:"Origin · acromial",muscleMeshes:ie(i,["delt_acro"]),boneMeshes:ie(i,["scapula"])},{kind:"origin",label:"Origin · spinal",muscleMeshes:ie(i,["delt_spin"]),boneMeshes:ie(i,["scapula"])},{kind:"insertion",label:"Insertion",muscleMeshes:ie(i,["delt_clav","delt_acro","delt_spin"]),boneMeshes:ie(i,["humerus"]),prefer:"lateral"}]},pectoralis_major:{id:"pectoralis_major",description:"A large, fan-shaped muscle of the anterior chest wall with clavicular, sternocostal, and a small abdominal part. Its fibers converge to a U-shaped tendon on the humerus and form the greater part of the anterior axillary fold.",origin:"Clavicular head: anterior surface of the medial half of the clavicle. Sternocostal head: anterior surface of the sternum, the costal cartilages of (typically) ribs 1–6, and the aponeurosis of the external oblique. The abdominal part is a small inferior slip from that aponeurosis.",insertion:"Lateral lip of the intertubercular (bicipital) sulcus of the humerus — the crest of the greater tubercle. The tendon is bilaminar: clavicular fibers insert more anteriorly and distal; sternocostal fibers twist so that the lowest fibers insert highest.",action:"Adducts and medially rotates the arm. The clavicular head flexes the arm (from the anatomical position) and adducts it horizontally; the sternocostal head extends the flexed arm (as in a throwing follow-through or a bench-press lowering). With the upper limb fixed it can also draw the trunk upward or act as an accessory inspiratory muscle.",innervation:"Lateral and medial pectoral nerves (C5–T1). The clavicular head is supplied mainly by C5–C6; the sternocostal head mainly by C7–T1.",sitesForSide:i=>[{kind:"origin",label:"Origin · clavicular",muscleMeshes:ie(i,["pec_clav"]),boneMeshes:ie(i,["clavicle"]),prefer:"medial"},{kind:"origin",label:"Origin · sternocostal",muscleMeshes:ie(i,["pec_stern"]),boneMeshes:["sternum_manubrium","sternum_body",...La(i,1,6)]},{kind:"origin",label:"Origin · abdominal",muscleMeshes:ie(i,["pec_abd"]),boneMeshes:["sternum_body","sternum_xiphoid",...La(i,5,7)]},{kind:"insertion",label:"Insertion",muscleMeshes:ie(i,["pec_clav","pec_stern","pec_abd"]),boneMeshes:ie(i,["humerus"]),prefer:"cranial"}]},external_oblique:{id:"external_oblique",description:"The most superficial of the three anterolateral abdominal muscles. Its fibers run inferomedially (“hands in pockets”). A broad aponeurosis forms the anterior wall of the rectus sheath (above the arcuate line), the linea alba, and the inguinal ligament along its free lower border.",origin:"External surfaces of ribs 5–12, interdigitating superiorly with serratus anterior and inferiorly with latissimus dorsi.",insertion:"Linea alba, the pubic tubercle, and the anterior half of the iliac crest, via a broad aponeurosis. The thickened free inferior border of the aponeurosis stretches from the anterior superior iliac spine to the pubic tubercle as the inguinal ligament. (This model has no linea-alba mesh; the label marks the iliac attachment on the hip bone.)",action:"Unilateral contraction rotates the trunk to the opposite side and laterally flexes it to the same side. Bilateral contraction flexes the trunk, compresses the abdominal viscera (straining, expiration), and can depress the ribs.",innervation:"Thoraco-abdominal nerves (anterior rami of T7–T11) and the subcostal nerve (T12). The lowest fibers may also receive a contribution from the iliohypogastric nerve (L1).",sitesForSide:i=>[{kind:"origin",label:"Origin · ribs",muscleMeshes:[`ext_oblique_${i}`],boneMeshes:La(i,5,12)},{kind:"insertion",label:"Insertion · iliac crest",muscleMeshes:[`ext_oblique_${i}`],boneMeshes:ie(i,["hip"]),prefer:"cranial"}]},serratus_anterior:{id:"serratus_anterior",description:"A broad, sheet-like muscle on the lateral chest wall, running from the upper ribs around the thorax to the medial border of the scapula. Its saw-toothed slips interdigitate with the external oblique. It is sometimes called the boxer’s muscle because it protracts the scapula in a reaching or punching motion.",origin:"External surfaces of the upper eight or nine ribs, and the intervening fascia, by a series of fleshy digitations. The first digitation often arises from ribs 1 and 2; lower slips interdigitate with the external oblique.",insertion:"The whole length of the medial (vertebral) border of the scapula, on its costal surface. The lower fibers, which are the strongest, reach the inferior angle and are important for upward rotation of the glenoid.",action:"Protracts the scapula (draws it forward around the chest wall) and holds it firmly against the thorax. The lower fibers upwardly rotate the glenoid, working with trapezius in overhead elevation of the arm. Weakness lets the medial border lift from the chest wall (a winged scapula).",innervation:"Long thoracic nerve (C5–C7), which runs on the superficial surface of the muscle and is vulnerable to injury.",sitesForSide:i=>[{kind:"origin",label:"Origin · ribs",muscleMeshes:[`serratus_ant_${i}`],boneMeshes:La(i,1,9)},{kind:"insertion",label:"Insertion · medial scapula",muscleMeshes:[`serratus_ant_${i}`],boneMeshes:ie(i,["scapula"]),prefer:"medial"}]},biceps_brachii:{id:"biceps_brachii",description:"A two-headed muscle of the anterior arm that crosses both the shoulder and the elbow. The long head is more lateral and occupies the intertubercular sulcus; the short head lies medially. Distally the two bellies join in a common tendon.",origin:"Long head: supraglenoid tubercle of the scapula (and the adjacent glenoid labrum); the tendon then passes through the shoulder joint and the intertubercular sulcus. Short head: tip of the coracoid process of the scapula, beside coracobrachialis.",insertion:"Radial tuberosity, and the fascia of the forearm via the bicipital aponeurosis (which blends with the deep fascia over the medial forearm and helps protect the brachial artery and median nerve in the cubital fossa).",action:"Flexes the elbow, most powerfully when the forearm is supinated, and is the chief supinator of the forearm (especially when the elbow is flexed). The long head also assists flexion at the shoulder and helps hold the humeral head against the glenoid.",innervation:"Musculocutaneous nerve (C5–C7).",sitesForSide:i=>[{kind:"origin",label:"Origin · long head",muscleMeshes:ie(i,["biceps_long"]),boneMeshes:ie(i,["scapula"]),prefer:"lateral"},{kind:"origin",label:"Origin · short head",muscleMeshes:ie(i,["biceps_short"]),boneMeshes:ie(i,["scapula"]),prefer:"anterior"},{kind:"insertion",label:"Insertion",muscleMeshes:ie(i,["biceps_long","biceps_short"]),boneMeshes:ie(i,["radius"]),prefer:"cranial"}]},triceps_brachii:{id:"triceps_brachii",description:"The only muscle of the posterior compartment of the arm, with long, lateral, and medial heads. The long head crosses the shoulder; the lateral and medial heads arise from the humerus, respectively above and below the radial (spiral) groove, so the radial nerve and profunda brachii artery pass between them.",origin:"Long head: infraglenoid tubercle of the scapula. Lateral head: posterior surface of the humerus, above the radial groove, and the lateral intermuscular septum. Medial head: posterior surface of the humerus below the radial groove, and the medial and lateral intermuscular septa; it is deeper and is engaged in all degrees of extension.",insertion:"Proximal end of the olecranon of the ulna, and the fascia of the forearm. A deep subtendinous bursa typically separates the tendon from the olecranon.",action:"Chief extensor of the elbow. The long head also adducts and extends the arm at the shoulder and helps stabilize the abducted humerus (for example, when bearing weight through the arm).",innervation:"Radial nerve (C6–C8). A small lateral contribution from the axillary nerve is sometimes described for the long head, but the radial nerve is the standard supply.",sitesForSide:i=>[{kind:"origin",label:"Origin · long head",muscleMeshes:ie(i,["triceps_long"]),boneMeshes:ie(i,["scapula"]),prefer:"lateral"},{kind:"origin",label:"Origin · lateral head",muscleMeshes:ie(i,["triceps_lat"]),boneMeshes:ie(i,["humerus"])},{kind:"origin",label:"Origin · medial head",muscleMeshes:ie(i,["triceps_med"]),boneMeshes:ie(i,["humerus"])},{kind:"insertion",label:"Insertion",muscleMeshes:ie(i,["triceps_long","triceps_lat","triceps_med"]),boneMeshes:ie(i,["ulna"]),prefer:"cranial"}]},gluteus_maximus:{id:"gluteus_maximus",description:"The largest and most superficial muscle of the buttock, and the most powerful extensor of the hip. Superficial fibers run into the iliotibial tract; deeper, more inferior fibers reach the femur directly.",origin:"Posterior gluteal line and the portion of the ilium behind it, the posterior surface of the sacrum and coccyx, the sacrotuberous ligament, and the gluteal aponeurosis (over gluteus medius).",insertion:"Chiefly the iliotibial tract of the fascia lata (which then reaches the lateral tibial condyle at Gerdy’s tubercle). Deeper inferior fibers insert on the gluteal tuberosity of the femur. (This model has no IT-tract mesh; the bony label marks the femoral attachment.)",action:"The chief extensor of the flexed thigh (rising from sitting, climbing, sprinting). It also assists lateral rotation of the thigh. Upper fibers may abduct, lower fibers may adduct. It steadies the femur on the tibia when standing, and is relatively quiet in easy standing or slow walking.",innervation:"Inferior gluteal nerve (L5–S2).",sitesForSide:i=>[{kind:"origin",label:"Origin · ilium",muscleMeshes:[`glut_max_${i}`],boneMeshes:ie(i,["hip"]),prefer:"posterior"},{kind:"origin",label:"Origin · sacrum",muscleMeshes:[`glut_max_${i}`],boneMeshes:["sacrum"]},{kind:"insertion",label:"Insertion · femur",muscleMeshes:[`glut_max_${i}`],boneMeshes:ie(i,["femur"]),prefer:"cranial"}]},iliacus:{id:"iliacus",description:"A fan-shaped muscle that fills the iliac fossa and, with psoas major, forms iliopsoas — the chief flexor of the hip. The two muscles remain separate playable items here; “iliopsoas” is the combined unit, not a correct name for iliacus alone.",origin:"Iliac fossa (the inner surface of the iliac blade), the inner lip of the iliac crest, the iliolumbar and anterior sacroiliac ligaments, and often the lateral part of the sacral ala. In this model the hip is a single fused os coxae mesh, so the origin label marks the muscle’s nearest approach to that mesh, in the region of the iliac fossa.",insertion:"Lesser trochanter of the femur, via a tendon that is shared with, or immediately beside, psoas major. Some fibers also insert on the femoral shaft just below the trochanter and on the capsule of the hip.",action:"Flexes the thigh at the hip. Acting with psoas major it is the principal hip flexor (for example, in sit-ups or marching). It can also assist lateral rotation of the thigh and, with the thigh fixed, helps flex the trunk on the femur.",innervation:"Femoral nerve (L2–L3, often described as L2–L4).",sitesForSide:i=>[{kind:"origin",label:"Origin",muscleMeshes:[`iliacus_${i}`],boneMeshes:ie(i,["hip"]),prefer:"medial"},{kind:"insertion",label:"Insertion · lesser trochanter",muscleMeshes:[`iliacus_${i}`],boneMeshes:ie(i,["femur"]),prefer:"medial"}]},psoas_major:{id:"psoas_major",description:"A long, thick muscle running from the lumbar spine along the pelvic brim to the proximal femur. Together with iliacus it forms iliopsoas, the chief flexor of the hip. “Iliopsoas” names the combined unit, not psoas major alone. (Psoas minor is not a separate mesh in this pack.)",origin:"Vertebral bodies and intervening discs of T12–L5, and the transverse processes of the lumbar vertebrae, often with tendinous arches over the lumbar vessels.",insertion:"Lesser trochanter of the femur, by a tendon shared with or immediately beside iliacus. The muscle passes beneath the inguinal ligament and anterior to the hip joint.",action:"Flexes the thigh at the hip. Acting from below, it flexes and laterally flexes the lumbar spine and helps maintain the lumbar lordosis. It can also assist lateral rotation of the thigh.",innervation:"Anterior rami of L1–L3 (sometimes L1–L4).",sitesForSide:i=>[{kind:"origin",label:"Origin",muscleMeshes:[`psoas_maj_${i}`],boneMeshes:Sh("t12","l1","l2","l3","l4","l5")},{kind:"insertion",label:"Insertion · lesser trochanter",muscleMeshes:[`psoas_maj_${i}`],boneMeshes:ie(i,["femur"]),prefer:"medial"}]},rectus_femoris:{id:"rectus_femoris",description:"The only quadriceps muscle that crosses both the hip and the knee. It lies in the midline of the anterior thigh, superficial to vastus intermedius, and contributes to the quadriceps tendon.",origin:"Straight (direct) head: anterior inferior iliac spine. Reflected (indirect) head: a groove just above the acetabulum (superior acetabular rim) and the fibrous capsule of the hip. Both heads arise from the hip bone, so a single origin label marks the nearest approach of the muscle to that mesh.",insertion:"Base of the patella via the quadriceps tendon, then the tibial tuberosity via the patellar ligament. The muscular insertion label is placed on the patella, the bony attachment this mesh actually reaches.",action:"Extends the leg at the knee and flexes the thigh at the hip. Because it is a two-joint muscle, it is a less effective knee extensor when the hip is fully flexed, and a less effective hip flexor when the knee is fully extended.",innervation:"Femoral nerve (L2–L4).",sitesForSide:i=>[{kind:"origin",label:"Origin",muscleMeshes:[`rectus_fem_${i}`],boneMeshes:ie(i,["hip"]),prefer:"anterior"},{kind:"insertion",label:"Insertion · patella",muscleMeshes:[`rectus_fem_${i}`],boneMeshes:ie(i,["patella"]),prefer:"cranial"}]},vastus_lateralis:{id:"vastus_lateralis",description:"The largest of the four quadriceps muscles, forming the bulk of the lateral thigh. It has a broad origin along the femur and contributes a large share of the quadriceps tendon and the lateral patellar retinaculum.",origin:"Greater trochanter, the intertrochanteric line, the gluteal tuberosity, the lateral lip of the linea aspera, and the lateral intermuscular septum of the thigh.",insertion:"Lateral border of the patella (quadriceps tendon) and, via the patellar ligament, the tibial tuberosity. Expansions form the lateral patellar retinaculum and blend with the capsule of the knee. The label marks the patella, the bony attachment this mesh reaches.",action:"Extends the leg at the knee. Together with vastus medialis it also helps guide and stabilize the patella in the trochlear groove during flexion and extension.",innervation:"Femoral nerve (L2–L4).",sitesForSide:i=>[{kind:"origin",label:"Origin",muscleMeshes:[`vastus_lat_${i}`],boneMeshes:ie(i,["femur"]),prefer:"lateral"},{kind:"insertion",label:"Insertion · patella",muscleMeshes:[`vastus_lat_${i}`],boneMeshes:ie(i,["patella"]),prefer:"cranial"}]},vastus_medialis:{id:"vastus_medialis",description:"The medial quadriceps muscle, whose more distal fibers (often called vastus medialis obliquus, VMO) run almost horizontally and form the characteristic teardrop at the medial knee. It is important for medial patellar stability.",origin:"Intertrochanteric line, medial lip of the linea aspera, medial supracondylar line of the femur, and the tendons of adductor longus and adductor magnus, plus the medial intermuscular septum.",insertion:"Medial border of the patella (quadriceps tendon) and, via the patellar ligament, the tibial tuberosity. Distal fibers contribute to the medial patellar retinaculum. The label marks the patella, the bony attachment this mesh reaches.",action:"Extends the leg at the knee. The oblique distal fibers pull the patella medially and help prevent lateral dislocation, especially in the last degrees of extension.",innervation:"Femoral nerve (L2–L4).",sitesForSide:i=>[{kind:"origin",label:"Origin",muscleMeshes:[`vastus_med_${i}`],boneMeshes:ie(i,["femur"]),prefer:"medial"},{kind:"insertion",label:"Insertion · patella",muscleMeshes:[`vastus_med_${i}`],boneMeshes:ie(i,["patella"]),prefer:"cranial"}]},vastus_intermedius:{id:"vastus_intermedius",description:"The deepest of the four quadriceps muscles, lying on the anterior and lateral femoral shaft and hidden under rectus femoris. It contributes to the quadriceps tendon and, like the other vasti, acts only at the knee.",origin:"Anterior and lateral surfaces of the upper two-thirds of the femoral shaft, and the adjacent lateral intermuscular septum of the thigh. (A small articularis genus slip, often described with this muscle, is not a separate mesh here.)",insertion:"Base of the patella via the quadriceps tendon, then the tibial tuberosity via the patellar ligament. The label marks the patella, the bony attachment this mesh reaches.",action:"Extends the leg at the knee. Unlike rectus femoris it does not cross the hip, so it is a pure knee extensor.",innervation:"Femoral nerve (L2–L4).",sitesForSide:i=>[{kind:"origin",label:"Origin",muscleMeshes:[`vastus_int_${i}`],boneMeshes:ie(i,["femur"]),prefer:"anterior"},{kind:"insertion",label:"Insertion · patella",muscleMeshes:[`vastus_int_${i}`],boneMeshes:ie(i,["patella"]),prefer:"cranial"}]},biceps_femoris:{id:"biceps_femoris",description:"The lateral hamstring, with a long head (two-joint) and a short head (knee only). The two heads join in a common tendon to the head of the fibula and form the superolateral border of the popliteal fossa. It is the only hamstring with dual nerve supply.",origin:"Long head: ischial tuberosity, by a shared tendon with semitendinosus (and a slip from the sacrotuberous ligament). Short head: lateral lip of the linea aspera and the lateral supracondylar line of the femur, and the lateral intermuscular septum. The short head does not arise from the ischium.",insertion:"Lateral aspect of the head of the fibula, embracing the fibular collateral ligament; some fibers also reach the lateral condyle of the tibia and the deep fascia of the leg.",action:"Flexes the leg at the knee and laterally rotates the flexed leg. The long head also extends the thigh at the hip and assists lateral rotation of the thigh. The short head acts only at the knee.",innervation:"Long head: tibial division of the sciatic nerve (L5–S2). Short head: common fibular (peroneal) division of the sciatic nerve (L5–S2).",sitesForSide:i=>[{kind:"origin",label:"Origin · long head",muscleMeshes:ie(i,["bf_long"]),boneMeshes:ie(i,["hip"]),prefer:"caudal"},{kind:"origin",label:"Origin · short head",muscleMeshes:ie(i,["bf_short"]),boneMeshes:ie(i,["femur"])},{kind:"insertion",label:"Insertion",muscleMeshes:ie(i,["bf_long","bf_short"]),boneMeshes:ie(i,["fibula"]),prefer:"cranial"}]},semitendinosus:{id:"semitendinosus",description:"A medial hamstring with a long, cord-like distal tendon. It lies more superficial than semimembranosus and forms the superomedial border of the popliteal fossa with that muscle. Distally it is one of the three pes anserinus tendons.",origin:"Ischial tuberosity, by a common tendon with the long head of biceps femoris, on the inferomedial aspect of the tuberosity.",insertion:"Medial surface of the proximal tibia, as part of the pes anserinus (with sartorius and gracilis), a few centimetres distal to the tibial tuberosity and posterior to the insertions of those two muscles.",action:"Extends the thigh at the hip, flexes the leg at the knee, and medially rotates the flexed leg. With semimembranosus it can also help medially rotate the extended thigh.",innervation:"Tibial division of the sciatic nerve (L5–S2).",sitesForSide:i=>[{kind:"origin",label:"Origin",muscleMeshes:[`semitend_${i}`],boneMeshes:ie(i,["hip"]),prefer:"caudal"},{kind:"insertion",label:"Insertion",muscleMeshes:[`semitend_${i}`],boneMeshes:ie(i,["tibia"]),prefer:"cranial"}]},semimembranosus:{id:"semimembranosus",description:"The deepest of the three hamstrings, named for its long, flat proximal tendon. It lies deep to semitendinosus on the medial side of the thigh and has important expansions into the posteromedial capsule of the knee.",origin:"Ischial tuberosity, by a thick tendon just superolateral to the shared biceps–semitendinosus origin (still on the hip-bone mesh in this model).",insertion:"Posterior aspect of the medial condyle of the tibia. Fibrous expansions form the oblique popliteal ligament, a slip over popliteus, and attachments to the posterior capsule and medial meniscus — a posteromedial stabilizing complex.",action:"Extends the thigh at the hip, flexes the leg at the knee, and medially rotates the flexed leg. Its capsular expansions also help stabilize the posteromedial knee.",innervation:"Tibial division of the sciatic nerve (L5–S2).",sitesForSide:i=>[{kind:"origin",label:"Origin",muscleMeshes:[`semimemb_${i}`],boneMeshes:ie(i,["hip"]),prefer:"caudal"},{kind:"insertion",label:"Insertion",muscleMeshes:[`semimemb_${i}`],boneMeshes:ie(i,["tibia"]),prefer:"cranial"}]},gastrocnemius:{id:"gastrocnemius",description:"The most superficial muscle of the calf, with medial and lateral heads that form the bulge of the calf and the inferior boundaries of the popliteal fossa. It is a two-joint muscle, crossing the knee and the ankle, and joins soleus in the calcaneal (Achilles) tendon.",origin:"Medial head: posterior surface of the medial femoral condyle, just behind the adductor tubercle, and the adjacent capsule of the knee. Lateral head: lateral surface of the lateral femoral condyle and the adjacent capsule. A small sesamoid (the fabella) is sometimes present in the lateral head.",insertion:"Posterior surface of the calcaneus, via the calcaneal (Achilles) tendon, which gastrocnemius forms with soleus. The tendon inserts on the middle third of the posterior calcaneal surface.",action:"Plantarflexes the foot at the ankle and flexes the leg at the knee. It is important in propulsion (walking, running, jumping). Because it already shortens when the knee is flexed, it is a less effective plantarflexor in that position — soleus then carries more of the load.",innervation:"Tibial nerve (S1–S2).",sitesForSide:i=>[{kind:"origin",label:"Origin · medial head",muscleMeshes:ie(i,["gastroc_med"]),boneMeshes:ie(i,["femur"]),prefer:"caudal"},{kind:"origin",label:"Origin · lateral head",muscleMeshes:ie(i,["gastroc_lat"]),boneMeshes:ie(i,["femur"]),prefer:"caudal"},{kind:"insertion",label:"Insertion",muscleMeshes:ie(i,["gastroc_lat","gastroc_med"]),boneMeshes:ie(i,["calcaneus"]),prefer:"posterior"}]},soleus:{id:"soleus",description:"A broad, powerful postural muscle deep to gastrocnemius in the posterior leg. It does not cross the knee. With gastrocnemius it forms the triceps surae and shares the calcaneal tendon. A tendinous arch at its origin allows the tibial nerve and popliteal vessels to pass into the leg.",origin:"Posterior surface of the head and proximal shaft of the fibula, the soleal line and the middle third of the medial border of the tibia, and a fibrous arch between the tibia and fibula.",insertion:"Posterior surface of the calcaneus, via the calcaneal (Achilles) tendon shared with gastrocnemius.",action:"Plantarflexes the foot at the ankle. It is a primary postural muscle, continuously active in quiet standing to keep the leg from toppling forward at the ankle. Because it does not cross the knee, it remains an effective plantarflexor when the knee is flexed.",innervation:"Tibial nerve (S1–S2).",sitesForSide:i=>[{kind:"origin",label:"Origin · tibia",muscleMeshes:[`soleus_${i}`],boneMeshes:ie(i,["tibia"]),prefer:"cranial"},{kind:"origin",label:"Origin · fibula",muscleMeshes:[`soleus_${i}`],boneMeshes:ie(i,["fibula"]),prefer:"cranial"},{kind:"insertion",label:"Insertion",muscleMeshes:[`soleus_${i}`],boneMeshes:ie(i,["calcaneus"]),prefer:"posterior"}]},tibialis_anterior:{id:"tibialis_anterior",description:"The large muscle of the anterior compartment of the leg, lying against the lateral surface of the tibia. Its tendon is prominent at the front of the ankle, passing beneath the extensor retinacula and then medially onto the foot. It is the primary dorsiflexor of the ankle.",origin:"Lateral condyle and the upper two-thirds of the lateral surface of the tibia, the adjacent interosseous membrane, and the deep fascia of the leg (including the lateral intermuscular septum).",insertion:"Medial and plantar surfaces of the medial cuneiform and the base of the first metatarsal.",action:"Dorsiflexes the foot at the ankle and inverts the foot (at the subtalar and midtarsal joints). It helps support the medial longitudinal arch and, in the swing phase of gait, clears the toes from the ground. Weakness produces foot drop.",innervation:"Deep fibular (peroneal) nerve (L4–L5).",sitesForSide:i=>[{kind:"origin",label:"Origin",muscleMeshes:[`tib_ant_${i}`],boneMeshes:ie(i,["tibia"]),prefer:"cranial"},{kind:"insertion",label:"Insertion · medial cuneiform",muscleMeshes:[`tib_ant_${i}`],boneMeshes:ie(i,["cuneiform_med"]),prefer:"medial"},{kind:"insertion",label:"Insertion · 1st metatarsal",muscleMeshes:[`tib_ant_${i}`],boneMeshes:ie(i,["metatarsal1"]),prefer:"cranial"}]}},ry=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth"];function oy(i){const e=`t${i}`;if(i===1)return{id:e,description:"T1 is the first thoracic vertebra, transitional from the cervical pattern. It has a relatively large, somewhat triangular body, a fairly horizontal spinous process (sometimes still palpable just below C7), and a complete superior costal facet for the head of the first rib plus an inferior demifacet for the second rib.",articulations:"C7 above, T2 below; the head of rib 1 on the full superior costal facet, and the head of rib 2 on the inferior demifacet; the tubercle of rib 1 on the transverse process.",features:"Transverse processes still carry a costotransverse facet. The vertebral foramen is relatively large compared with lower thoracic levels. The first pair of ribs — not C7 — form the boundary of the thoracic inlet with T1 and the manubrium."};if(i===10)return{id:e,description:"T10 is a lower thoracic vertebra, transitional toward the lumbar pattern. It typically has a single complete costal facet on the body (sometimes still a small inferior demifacet) for the head of the tenth rib, and a costotransverse facet on the transverse process.",articulations:"T9 above, T11 below; the head of rib 10 on the vertebral body; the tubercle of rib 10 on the transverse process.",features:"The spinous process is shorter and less steeply downward than at mid-thoracic levels. Costal facet pattern at T9–T10 is somewhat variable between individuals."};if(i===11)return{id:e,description:"T11 is a transitional thoracolumbar vertebra. It has a large body approaching the lumbar shape, a short, almost horizontal spinous process, and a single complete costal facet for the head of the eleventh (floating) rib. There is typically no facet on the transverse process.",articulations:"T10 above, T12 below; the head of rib 11 on the vertebral body. There is usually no costotransverse joint.",features:"Absence of a costotransverse facet matches the missing tubercle of the floating 11th rib. Mamillary-like processes may begin to appear, foreshadowing the lumbar pattern."};if(i===12)return{id:e,description:"T12 is the last thoracic vertebra and is strongly lumbar in character, with a large body, stout transverse processes, and a short horizontal spinous process. It carries a single complete costal facet for the twelfth (floating) rib and usually has no costotransverse facet. Inferior articular facets already face laterally, like those of a lumbar vertebra, so rotation is more limited below this level.",articulations:"T11 above, L1 below; the head of rib 12 on the vertebral body. There is usually no costotransverse joint.",features:"A common site of traumatic fracture (the thoracolumbar junction is a transition in both curvature and stiffness). The change in inferior articular-facet orientation is the key landmark for identifying T12."};const t=i>=2&&i<=8;return{id:e,description:t?`T${i} is a typical mid-thoracic vertebra, with a heart-shaped body, a long spinous process that slopes steeply downward, and demifacets for ribs. The superior demifacet receives the head of rib ${i}; the inferior demifacet receives the head of rib ${i+1}.`:`T${i} is a lower mid-thoracic vertebra. Costal facet pattern here can vary: it usually still has a superior demifacet (or a nearly complete facet) for rib ${i} and a small inferior demifacet for rib ${i+1}. The body and spine are beginning to look more like the lower thoracic levels.`,articulations:`T${i-1} above, T${i+1} below; the head of rib ${i} (superior demifacet, together with the inferior demifacet of T${i-1}) and the head of rib ${i+1} (inferior demifacet); the tubercle of rib ${i} at the costotransverse joint.`,features:"The vertebral canal is relatively round and smaller than in the cervical region. Pedicles are short; laminae are broad and overlap those of the vertebra below, limiting extension."}}function ly(i){const e=`rib${i}`,t=ry[i-1],n=i<=7?"It is a true (vertebrosternal) rib: its cartilage attaches directly to the sternum.":i<=10?"It is a false (vertebrochondral) rib: its cartilage joins the cartilage of the rib above rather than reaching the sternum directly.":"It is a floating (vertebral, free) rib: it has no anterior cartilaginous attachment to the sternum or to the rib above.";if(i===1)return{id:e,description:"The first rib is short, broad, and sharply curved, and is the most atypical rib. It is flattened in the horizontal plane and forms the bony margin of the thoracic inlet with T1 and the manubrium. On its superior surface, a scalene tubercle (for scalenus anterior) separates grooves for the subclavian vein (anterior) and the subclavian artery with the inferior trunk of the brachial plexus (posterior).",articulations:"Head articulates with the body of T1 only (a single full facet). The tubercle articulates with the transverse process of T1. The costal cartilage meets the manubrium just below the sternoclavicular joint.",features:"The neck is short; the shaft has no typical costal groove on its inferior inner border in the same way as typical ribs. It is closely related to the apex of the lung and the stellate (cervicothoracic) ganglion."};if(i===2)return{id:e,description:"The second rib is longer than the first but still atypical, with a more typical curvature beginning to appear. Its external surface has a rough tuberosity for part of the origin of serratus anterior. It contributes to the shape of the upper thoracic wall.",articulations:"Head articulates with the inferior demifacet of T1 and the superior demifacet of T2. The tubercle articulates with the transverse process of T2. The costal cartilage meets the sternal angle (manubriosternal joint), a useful surface landmark at the level of T4/T5 and the aortic arch.",features:`${n} The sternal end of the second costal cartilage is a standard clinical landmark for counting ribs.`};if(i>=3&&i<=9){const s=i<=7?"attaches to the side of the sternal body":i===8?"joins the seventh costal cartilage":"joins the eighth costal cartilage (and so, indirectly, the seventh)";return{id:e,description:`The ${t} rib is a typical rib, with a head (two facets), a neck, a tubercle, and a curved shaft that turns at the angle. The shaft is thin and flattened, with a costal groove on its internal inferior border that shelters the intercostal vein, artery, and nerve (VAN, from superior to inferior).`,articulations:`Head: inferior demifacet of T${i-1} and superior demifacet of T${i}. Tubercle: transverse process of T${i}. Anteriorly, the costal cartilage ${s}.`,features:`${n} The rib angle is the most posterior point of the shaft and a common site of fracture.`}}return i===10?{id:e,description:"The tenth rib is often slightly atypical: its head usually has a single facet (articulating only with T10) rather than two demifacets. It otherwise resembles a typical rib, with a tubercle and a shaft that still reaches an anterior cartilage.",articulations:"Head: typically the complete costal facet of T10. Tubercle: transverse process of T10. Anteriorly its cartilage joins the ninth (and thereby the costal margin).",features:`${n} Facet pattern at rib 9–10 can vary between individuals.`}:i===11?{id:e,description:"The eleventh rib is short and has a single facet on its head for T11. It usually has no tubercle and no neck to speak of, and it does not attach anteriorly to the sternum or to another costal cartilage.",articulations:"Head only: the complete costal facet of T11. There is typically no costotransverse joint and no sternal or chondral attachment.",features:`${n} The tip lies in the posterior abdominal wall musculature and is related to the kidney on each side.`}:{id:e,description:"The twelfth rib is the shortest rib, with a single facet on its head for T12, no tubercle, and no anterior attachment. It is often little more than a slender shaft pointed into the posterior abdominal wall.",articulations:"Head only: the complete costal facet of T12. There is typically no costotransverse joint and no sternal or chondral attachment.",features:`${n} It gives attachment to quadratus lumborum and the lumbocostal ligaments, and is a landmark in the loin. Length is quite variable.`}}function cy(i){const e=`l${i}`,t=i===1?"T12 above, L2 below; no ribs. The T12–L1 joint is part of the thoracolumbar junction.":i===5?"L4 above, and the sacrum (S1) below at the lumbosacral joint.":`L${i-1} above, L${i+1} below. No ribs.`;if(i===5)return{id:e,description:"L5 is the largest lumbar vertebra. Its body is deeper anteriorly than posteriorly, contributing to the lumbosacral angle, and its transverse processes are thick and strong, arising from both the pedicle and the body. It carries much of the axial load into the sacrum.",articulations:t,features:"The inferior articular facets face well forward to lock with S1 and resist anterior slip (spondylolisthesis, when the pars interarticularis fails, is most common at L5). The L5/S1 disc is also a frequent site of degeneration and herniation."};const n=i===1?"L1 often lies at the level of the end of the spinal cord (the conus medullaris is typically about L1–L2 in adults). The first lumbar vertebra still sits close to the thoracolumbar junction, a relatively mobile and injury-prone region.":i===4?"The L4 vertebral body / L4–L5 disc commonly lies at the level of the iliac crests (the supracristal or Tuffier’s line), a standard landmark for lumbar puncture, which is performed at L3/L4 or L4/L5 — below the conus.":"The vertebral canal here contains the cauda equina rather than the spinal cord (the cord typically ends at L1–L2). Intervertebral discs at lumbar levels are thick and a common site of posterolateral herniation.";return{id:e,description:`L${i} is a lumbar vertebra, built for weight bearing: a large kidney-shaped body, short stout pedicles, long slender transverse processes, and a broad, hatchet-shaped spinous process that projects nearly horizontally. Articular facets are in a sagittal plane, favouring flexion and extension and limiting rotation.`,articulations:t,features:n}}const hy={c1:{id:"c1",description:"C1, the atlas, is a ring of bone with anterior and posterior arches and paired lateral masses. It has no vertebral body and no spinous process (the body of C1 is incorporated into the dens of C2). The superior articular facets are concave and face upward to receive the occipital condyles; this atlanto-occipital joint is the main “yes” (nodding) joint of the head.",articulations:"Occipital condyles above (atlanto-occipital joints). C2 below: lateral atlanto-axial joints on the inferior facets, and the median atlanto-axial joint between the anterior arch and the dens, held by the transverse ligament of the atlas.",features:"The transverse processes are long and palpable; each has a transverse foramen for the vertebral artery, which turns medially on the posterior arch in a groove before entering the foramen magnum. The posterior arch has a small posterior tubercle rather than a spine."},c2:{id:"c2",description:"C2, the axis, is the second cervical vertebra, distinguished by the dens (odontoid process) that projects upward from its body to articulate with the anterior arch of C1. The dens is held there by the transverse ligament of the atlas, forming a pivot — the main “no” (rotation) joint of the head.",articulations:"C1 above (lateral and median atlanto-axial joints) and C3 below. The alar ligaments run from the dens to the occipital condyles and limit excessive rotation.",features:"A stout bifid spinous process and transverse foramina for the vertebral artery. Fracture of the dens, or rupture of the transverse ligament, can threaten the spinal cord and is clinically important."},c3:{id:"c3",description:"C3 is a typical cervical vertebra: a small body, a large triangular vertebral foramen, short pedicles, and a short, bifid spinous process. Like C4–C6, it has uncinate processes on the superolateral margins of the body and a transverse foramen in each transverse process.",articulations:"C2 above and C4 below, at the intervertebral disc and the paired zygapophysial joints. The uncinate processes also meet the beveled inferolateral margins of C2 at the uncovertebral (Luschka) joints.",features:"Transverse foramina transmit the vertebral artery, vein, and a sympathetic plexus. The bifid spine gives attachment to the ligamentum nuchae and deep cervical muscles. Articular facets are obliquely set, allowing flexion, extension, and rotation."},c4:{id:"c4",description:"C4 is a typical mid-cervical vertebra, with a small body, a triangular vertebral foramen, a short bifid spinous process, uncinate processes, and a transverse foramen in each transverse process.",articulations:"C3 above and C5 below, at the intervertebral disc and the zygapophysial joints, and at the uncovertebral (Luschka) joints formed by the uncinate processes.",features:"The same typical cervical pattern as its neighbours: transverse foramina for the vertebral vessels, a bifid spine, and uncovertebral joints that help guide flexion and extension and limit lateral flexion."},c5:{id:"c5",description:"C5 is a typical cervical vertebra, sitting in the mid-cervical stack with a small body, triangular vertebral foramen, bifid spinous process, uncinate processes, and transverse foramina.",articulations:"C4 above and C6 below, at the intervertebral disc and the zygapophysial joints, and at the uncovertebral (Luschka) joints.",features:"Typical cervical features continue here: transverse foramina for the vertebral artery, a bifid spine, and uncovertebral lips on the body. The cervical spinal enlargement (for the brachial plexus) lies at about this level of the cord, though that is a feature of the cord rather than of the bone."},c6:{id:"c6",description:"C6 is the last typical cervical vertebra before the transitional C7. It still has a small body, a triangular vertebral foramen, a usually bifid spinous process, uncinate processes, and a transverse foramen on each side.",articulations:"C5 above and C7 below, at the intervertebral disc and the zygapophysial joints, and at the uncovertebral (Luschka) joints.",features:"The vertebral artery typically enters the transverse foramen at C6, having ascended outside the foramina of C7. The anterior tubercle of the C6 transverse process (the carotid or Chassaignac tubercle) is often more prominent and is a landmark against which the common carotid artery can be compressed."},c7:{id:"c7",description:"C7, the vertebra prominens, is the last cervical vertebra and is transitional toward the thoracic type. It is named for its long, usually non-bifid spinous process, which is often the most prominent bony landmark at the base of the neck (though T1 can occasionally be more prominent).",articulations:"C6 above and T1 below. It does not normally carry a rib; the first rib articulates with T1.",features:"Transverse foramina are often small and, unlike C1–C6, usually do not transmit the vertebral artery (the artery typically enters the foramen at C6). Anterior and posterior tubercles of the transverse process are less distinct than at higher cervical levels."},...Object.fromEntries(Array.from({length:12},(i,e)=>[`t${e+1}`,oy(e+1)])),...Object.fromEntries(Array.from({length:5},(i,e)=>[`l${e+1}`,cy(e+1)])),sacrum:{id:"sacrum",description:"The sacrum is a large, triangular bone formed by the fusion of five sacral vertebrae. It forms the posterior part of the pelvic girdle, transmits the weight of the trunk to the hip bones, and encloses the sacral canal (a continuation of the vertebral canal) with the cauda equina and sacral spinal nerves.",articulations:"L5 above, at the lumbosacral (L5/S1) joint and via the L5 inferior articular processes. The paired auricular surfaces articulate with the hip bones at the sacroiliac joints. The apex articulates with the coccyx (no separate coccyx mesh in this pack).",features:"The sacral promontory (anterosuperior margin of S1) is an obstetric and anatomical landmark. Four pairs of anterior and posterior sacral foramina transmit the ventral and dorsal rami of S1–S4. The median sacral crest is the fused spinous processes; the sacral hiatus opens at the lower end of the canal."},manubrium:{id:"manubrium",description:"The manubrium is the broad, superior part of the sternum, roughly quadrangular, and the thickest portion of the bone. It forms the anterior boundary of the thoracic inlet and anchors the clavicles and the first costal cartilages.",articulations:"Clavicles at the sternoclavicular joints (with an articular disc). First costal cartilages at the lateral borders. The second costal cartilages meet at the manubriosternal joint. Inferiorly it joins the sternal body at the sternal angle (a secondary cartilaginous joint that often ossifies later in life).",features:"The jugular (suprasternal) notch is palpable in the midline. The sternal angle (of Louis) is a key surface landmark: it lies at T4/T5, marks the attachment of the second costal cartilage, the start and end of the aortic arch, and the bifurcation of the trachea."},sternum_body:{id:"sternum_body",description:"The body (gladiolus) of the sternum is the long mid-portion, formed from four sternebrae that fuse during development. It receives the costal cartilages of ribs 2–7 and gives origin to pectoralis major on each side.",articulations:"Manubrium at the sternal angle. Costal cartilages 2–7 along the lateral borders (the seventh at the junction with the xiphoid). Xiphoid process inferiorly, at the xiphisternal joint.",features:"Transverse ridges mark the fused sternebrae. The body is subcutaneous and a site for sternal marrow biopsy. A sternal foramen is a common, usually harmless, midline developmental gap."},xiphoid:{id:"xiphoid",description:"The xiphoid process is the small, variable, cartilaginous or partly ossified tip of the sternum. It may be pointed, bifid, or deflected, and it ossifies and often fuses with the sternal body in middle age.",articulations:"The sternal body at the xiphisternal joint, which typically lies at the level of T9 and the central tendon of the diaphragm. The seventh costal cartilages also meet at this junction.",features:"It gives attachment to the linea alba, fibers of the abdominal wall muscles, and some fibers of the diaphragm and transversus thoracis. Care is needed in chest compression so the xiphoid is not driven into the liver or diaphragm."},...Object.fromEntries(Array.from({length:12},(i,e)=>[`rib${e+1}`,ly(e+1)])),frontal:{id:"frontal",description:"The frontal bone forms the forehead, the roof of the orbits, and most of the anterior cranial fossa. It is a flat, unpaired bone in the adult (the metopic suture usually fuses in childhood).",articulations:"Parietal bones at the coronal suture, the greater wings of the sphenoid, the zygomatic bones at the zygomatic process, the lacrimal, ethmoid, and nasal bones, and the maxillae at the orbital margins. (Sphenoid, ethmoid, lacrimal, and nasal bones are not separate playable meshes here.)",features:"The supraorbital margin often has a supraorbital notch or foramen for the supraorbital nerve and vessels. Frontal air sinuses lie behind the superciliary arches. The sharp orbital plates form the roofs of the orbits."},parietal:{id:"parietal",description:"The paired parietal bones form most of the sides and roof of the cranial vault. Each is a curved, quadrangular flat bone.",articulations:"The opposite parietal at the sagittal suture, the frontal bone at the coronal suture, the occipital bone at the lambdoid suture, and the temporal and sphenoid bones at the lateral skull (pterion is the H-shaped meeting of frontal, parietal, temporal, and sphenoid — a thin and clinically important region).",features:"Temporal lines on the external surface mark the temporalis attachment. The parietal eminence is the original ossification centre. Grooves on the internal surface for the middle meningeal artery are clinically important in extradural haemorrhage after a blow to the pterion."},temporal:{id:"temporal",description:"The paired temporal bones form the lower sides of the skull and house the middle and inner ear. Each has squamous, mastoid, petrous, and tympanic parts, plus a styloid process and a zygomatic process that completes the zygomatic arch.",articulations:"Parietal, occipital, sphenoid, and zygomatic bones, and the mandible at the temporomandibular joint (the mandibular fossa and articular tubercle). The mastoid process is the insertion of sternocleidomastoid.",features:"The external acoustic meatus opens in the tympanic part. The petrous part is a dense wedge in the skull base containing the bony labyrinth and the carotid canal. The stylomastoid foramen transmits the facial nerve (CN VII). The zygomatic process meets the zygomatic bone to form the arch."},occipital:{id:"occipital",description:"The occipital bone forms the back and much of the base of the cranium, around the foramen magnum, through which the spinal cord becomes continuous with the brainstem.",articulations:"Parietal bones at the lambdoid suture, the temporal bones (including the jugular foramen between occipital and petrous temporal), the sphenoid at the clivus / basilar part, and the atlas at the occipital condyles (atlanto-occipital joints).",features:"The external occipital protuberance and superior nuchal lines give attachment to trapezius and the nuchal ligament. The occipital condyles sit beside the foramen magnum. The hypoglossal canal (for CN XII) passes through the condylar region. Internally, grooves and protuberances related to the dural venous sinuses form the cruciform eminence."},mandible:{id:"mandible",description:"The mandible is the unpaired bone of the lower jaw and the only movable bone of the skull (apart from the ear ossicles). It has a horseshoe-shaped body and two rami; each ramus ends in a condylar process (head) and a coronoid process.",articulations:"The mandibular heads articulate with the mandibular fossae of the temporal bones at the temporomandibular joints, each with an articular disc.",features:"The alveolar process carries the lower teeth. The mental foramen (mental nerve and vessels) opens on the external body; the mandibular foramen on the inner ramus admits the inferior alveolar nerve. The angle and ramus give attachment to masseter and medial pterygoid; the coronoid process receives temporalis."},maxilla:{id:"maxilla",description:"The paired maxillae form the upper jaw, the floor of the orbit, the floor and lateral wall of the nasal cavity, and most of the hard palate. They contain the maxillary air sinuses, the largest of the paranasal sinuses.",articulations:"The opposite maxilla in the midline, the zygomatic, frontal, palatine, nasal, lacrimal, ethmoid, inferior nasal concha, and the vomer, and (via teeth and occlusion) the mandible. Several of these neighbours are not separate playable meshes in this pack.",features:"The alveolar process carries the upper teeth. The infraorbital foramen, below the orbital margin, transmits the infraorbital nerve and vessels. The palatine process forms most of the hard palate. The maxillary sinus drains into the middle meatus of the nose, an awkward drainage path when upright."},zygomatic:{id:"zygomatic",description:"The paired zygomatic (cheek, malar) bones form the prominence of the cheek and the lateral and inferior margins of the orbit. Each has frontal, temporal, and maxillary processes.",articulations:"Frontal bone at the frontozygomatic suture (lateral orbital margin), the zygomatic process of the temporal bone (completing the zygomatic arch), and the zygomatic process of the maxilla (inferior orbital margin).",features:"The zygomatic arch is a subcutaneous landmark and a superficial origin for masseter. A small zygomaticofacial foramen often pierces the outer surface. The temporal process is relatively slender and a common site of isolated arch fracture."},clavicle:{id:"clavicle",description:"The clavicle (collarbone) is an S-shaped long bone lying subcutaneously between the manubrium and the acromion. It is the only bony strut holding the upper limb away from the trunk, and it is the first long bone to ossify (and a frequent fracture site, typically in the middle third).",articulations:"Medially, the manubrium (and a small facet for the first costal cartilage) at the sternoclavicular joint, which has an articular disc. Laterally, the acromion at the acromioclavicular joint.",features:"The medial two-thirds are convex forward; the lateral third is concave forward. The inferior surface has an impression for the costoclavicular ligament, a subclavian groove, and a conoid tubercle with a trapezoid line for the coracoclavicular ligament. Descending trapezius and anterior deltoid attach along the lateral third; the clavicular heads of pectoralis major and sternocleidomastoid attach more medially."},scapula:{id:"scapula",description:"The scapula (shoulder blade) is a flat, triangular bone on the posterior thoracic wall, usually overlying ribs 2–7. It has a slightly concave costal surface (subscapular fossa), a posterior spine that ends laterally as the acromion, and a coracoid process projecting anteriorly. The glenoid cavity on the lateral angle forms the socket of the shoulder.",articulations:"Head of the humerus at the glenohumeral joint (a shallow ball-and-socket, deepened by the labrum). Acromion with the clavicle at the acromioclavicular joint. It does not articulate directly with the ribs; it glides on them in a scapulothoracic “joint.”",features:"The spine divides the posterior surface into supraspinous and infraspinous fossae. The supraglenoid and infraglenoid tubercles are the origins of the long heads of biceps and triceps. The coracoid process gives origin to the short head of biceps and coracobrachialis, and attachment to the coracoclavicular and coracoacromial ligaments. The glenoid faces laterally and slightly anteriorly."},humerus:{id:"humerus",description:"The humerus is the long bone of the arm. Proximally it has a hemispherical head, anatomical neck, greater and lesser tubercles, and an intertubercular sulcus; the surgical neck (a common fracture site) lies just below the tubercles. The shaft is cylindrical above and triangular below, with a deltoid tuberosity and a spiral (radial) groove. Distally the bone expands into medial and lateral epicondyles, a trochlea (ulna), and a capitulum (radius).",articulations:"Glenoid cavity of the scapula at the shoulder. At the elbow, the trochlea with the trochlear notch of the ulna, and the capitulum with the head of the radius; the proximal radio-ulnar joint is between the radial head and the radial notch of the ulna.",features:"The intertubercular sulcus lodges the long head of biceps; its lips receive pectoralis major (lateral), latissimus dorsi (floor), and teres major (medial). The radial nerve and profunda brachii artery run in the spiral groove (between the lateral and medial heads of triceps). The ulnar nerve passes behind the medial epicondyle."},radius:{id:"radius",description:"The radius is the lateral long bone of the forearm. It has a disc-shaped head at the elbow, a neck, a radial (bicipital) tuberosity, a triangular shaft that widens distally, and a distal end with a styloid process and an ulnar notch. In pronation and supination the radius rotates around the ulna, carrying the hand with it.",articulations:"Capitulum of the humerus and the radial notch of the ulna proximally (elbow and proximal radio-ulnar joints). Distally, the scaphoid and lunate at the radiocarpal (wrist) joint, and the head of the ulna at the distal radio-ulnar joint (via an articular disc, the triangular fibrocartilage).",features:"The radial tuberosity is the insertion of biceps brachii. The dorsal (Lister’s) tubercle on the distal posterior surface guides the tendon of extensor pollicis longus. The styloid process extends farther distally than the ulnar styloid, which matters when assessing a distal radial (Colles) fracture."},ulna:{id:"ulna",description:"The ulna is the medial long bone of the forearm, longer than the radius at the elbow and shorter at the wrist. Proximally it has the olecranon, the coronoid process, the trochlear notch, and a radial notch. The shaft tapers to a small rounded head and a styloid process at the wrist, which does not articulate directly with the carpus.",articulations:"Trochlea of the humerus at the elbow (hinge). Head of the radius at the proximal radio-ulnar joint; the ulnar head and the ulnar notch of the radius (plus the articular disc) at the distal radio-ulnar joint. The disc, not the ulna itself, meets the carpus (triquetrum / lunate).",features:"The olecranon is the insertion of triceps and the palpable “point” of the elbow. The subcutaneous posterior border is palpable along the forearm. The ulnar styloid is a landmark on the medial wrist; a gap between the styloids is a clue to distal radial deformity."},hip:{id:"hip",description:"The hip bone (os coxae, innominate bone) is a large, irregular pelvic bone formed by the fusion of ilium, ischium, and pubis at the acetabulum. In this model those three parts are a single mesh, not a split pelvis. The ilium is the broad upper blade, the ischium the posteroinferior part you sit on, and the pubis the anterior part meeting its fellow at the pubic symphysis.",articulations:"The acetabulum with the head of the femur (hip joint). The auricular surface of the ilium with the sacrum (sacroiliac joint). The pubic body with the opposite pubis at the pubic symphysis (a secondary cartilaginous joint).",features:"The iliac crest is palpable from the anterior superior iliac spine to the posterior superior iliac spine. The anterior inferior iliac spine and the superior acetabular rim are the origins of rectus femoris; the ischial tuberosity is the origin of the hamstrings. The acetabulum faces inferolaterally and is deepened by the labrum, with a lunate articular surface and a central acetabular fossa."},femur:{id:"femur",description:"The femur is the longest and strongest bone in the body, forming the thigh. Proximally it has a head (with a fovea for the ligament of the head), a neck, and greater and lesser trochanters. The shaft is slightly bowed forward, with a posterior linea aspera. Distally it expands into medial and lateral condyles and epicondyles, and a trochlear patellar surface.",articulations:"Acetabulum of the hip bone at the hip joint. Distally, the tibial condyles (via menisci) and the patella at the knee. The fibula does not articulate with the femur.",features:"The neck–shaft angle (normally about 125° in adults) and anteversion are important in hip mechanics; the femoral neck is a common fracture site in older people. The linea aspera gives origin to the vasti and the short head of biceps femoris, and receives adductors. The gluteal tuberosity receives deeper fibers of gluteus maximus. The medial and lateral femoral condyles are the origins of the two heads of gastrocnemius."},patella:{id:"patella",description:"The patella (kneecap) is the largest sesamoid bone, developed in the quadriceps tendon. It is triangular, with a superior base, an inferior apex, and a posterior articular surface divided by a vertical ridge into a larger lateral and a smaller medial facet.",articulations:"The trochlear (patellar) surface of the femur only. It does not articulate with the tibia; the patellar ligament continues from the apex to the tibial tuberosity.",features:"It increases the leverage of the quadriceps by holding the tendon off the axis of the knee, and protects the anterior joint. The quadriceps (rectus femoris and the vasti) insert on the base and margins; the patellar ligament leaves the apex. Lateral dislocation is more common than medial, because the lateral femoral condyle and vastus medialis normally restrain it."},tibia:{id:"tibia",description:"The tibia is the medial and weight-bearing long bone of the leg. Proximally it has broad medial and lateral condyles, an intercondylar eminence, and a tibial tuberosity. The shaft is triangular, with a sharp, subcutaneous anterior border. Distally it forms the medial malleolus and the plafond of the ankle.",articulations:"Femoral condyles at the knee (with menisci). Head of the fibula at the proximal tibiofibular joint. Distally, the talus at the ankle (with the fibula and the inferior tibiofibular syndesmosis), and the fibula again at the fibular notch.",features:"The tibial tuberosity is the insertion of the patellar ligament (and so of the quadriceps). The soleal line on the posterior shaft marks the origin of soleus. The medial surface of the proximal shaft receives the pes anserinus (sartorius, gracilis, semitendinosus). The anterior border and medial surface are subcutaneous and easily bruised."},fibula:{id:"fibula",description:"The fibula is the slender lateral long bone of the leg. It bears little axial weight (the tibia carries nearly all of it) but is important for muscle attachment, for the ankle mortise, and as a source of bone graft. It has a head (with an apex, the styloid), a narrow neck, a long shaft, and a distal lateral malleolus.",articulations:"The lateral condyle of the tibia at the proximal tibiofibular joint (not the femur). Distally, the fibular notch of the tibia (syndesmosis) and the lateral talus at the ankle.",features:"The head is the insertion of biceps femoris and the fibular collateral ligament; the common fibular nerve winds around the neck, a vulnerable site. Soleus and several peroneal and deep posterior muscles arise from the shaft. The lateral malleolus extends farther distally than the medial malleolus and helps resist eversion."},scaphoid:{id:"scaphoid",description:"The scaphoid (navicular of the hand) is the largest bone of the proximal carpal row, boat-shaped, and lies in the floor of the anatomical snuffbox. It spans both carpal rows in a functional sense, linking the proximal row to the trapezium and trapezoid.",articulations:"Radius (scaphoid fossa) proximally; lunate medially; capitate distomedially; trapezium and trapezoid distally.",features:"A narrow waist is a classic fracture site (a fall on the outstretched hand). Blood supply often enters distally, so a fracture through the waist risks avascular necrosis of the proximal pole. Tenderness in the snuffbox after a fall is a warning sign."},lunate:{id:"lunate",description:"The lunate is a crescent-shaped bone in the centre of the proximal carpal row. It is the keystone of the proximal row and the bone most often dislocated at the wrist (usually palmar, in a lunate or perilunate injury).",articulations:"Radius proximally (and the articular disc of the distal radio-ulnar joint on its medial corner); scaphoid laterally; triquetrum medially; capitate and a little of the hamate distally.",features:"Its palmar surface is broader than the dorsal, which makes dorsal dislocation of the capitate (perilunate) more likely than the reverse. Avascular necrosis of the lunate is Kienböck’s disease."},triquetrum:{id:"triquetrum",description:"The triquetrum (triquetral) is a pyramidal bone on the medial side of the proximal carpal row. It sits just distal to the articular disc of the ulna, not directly on the ulnar head.",articulations:"Lunate laterally, hamate distally, and the pisiform on its palmar surface. Proximally it relates to the triangular fibrocartilage, not to the ulna itself.",features:"It is the second most frequently fractured carpal bone (after the scaphoid), often from a fall with the hand in extension and ulnar deviation. The pisiform sits on its palmar surface in the tendon of flexor carpi ulnaris."},pisiform:{id:"pisiform",description:"The pisiform is a small, pea-shaped sesamoid bone in the tendon of flexor carpi ulnaris, on the palmar-medial aspect of the proximal carpal row. It is palpable at the base of the hypothenar eminence and forms the medial wall of the Guyon (ulnar) canal.",articulations:"Only the palmar surface of the triquetrum — a single synovial joint. It does not articulate with the ulna or with any other carpal bone.",features:"It is the last carpal to ossify. Flexor carpi ulnaris inserts on it and continues to the hook of the hamate and the bases of the fourth and fifth metacarpals as the pisohamate and pisometacarpal ligaments. The ulnar nerve and artery pass lateral to it in Guyon’s canal."},trapezium:{id:"trapezium",description:"The trapezium (greater multangular) is the most lateral bone of the distal carpal row and carries the saddle-shaped carpometacarpal joint of the thumb — the joint that gives the thumb its wide range of opposition and circumduction.",articulations:"Scaphoid proximally, trapezoid medially, and the first (and a little of the second) metacarpal distally.",features:"A palmar groove and tubercle (with a related fibrous sheath) help form the radial wall of the carpal tunnel and an attachment for the flexor retinaculum. Osteoarthritis of the first carpometacarpal joint is common and disabling."},trapezoid:{id:"trapezoid",description:"The trapezoid (lesser multangular) is the smallest bone of the distal carpal row, a compact wedge firmly set between the trapezium, capitate, scaphoid, and the second metacarpal. Isolated injury is uncommon.",articulations:"Scaphoid proximally, trapezium laterally, capitate medially, and the base of the second metacarpal distally.",features:"It is the most stable bone of the distal row, tightly bound to the second metacarpal, which itself is the most stable metacarpal. Little independent motion occurs at this carpometacarpal joint."},capitate:{id:"capitate",description:"The capitate is the largest carpal bone and the centre of the distal row (and of the carpus as a whole). Its head sits in a recess formed by the scaphoid and lunate; its distal surface meets the third metacarpal, with small facets for the second and fourth.",articulations:"Scaphoid and lunate proximally, trapezoid laterally, hamate medially, and the bases of metacarpals 2–4 (mainly the third) distally.",features:"It is the keystone of the carpal arch and a reference point for wrist motion and for many carpal injuries (perilunate dislocation circles around the capitate head). It ossifies first among the carpals, usually in the first year of life."},hamate:{id:"hamate",description:"The hamate is the medial bone of the distal carpal row, distinguished by the hook (hamulus) that projects palmar from its distal palmar surface. The hook is a palpable landmark in the heel of the hand and forms the lateral wall of Guyon’s canal and a medial attachment of the flexor retinaculum.",articulations:"Lunate (a small facet) and triquetrum proximally, capitate laterally, and the bases of the fourth and fifth metacarpals distally.",features:"The hook can be fractured by a direct blow (a bat, club, or racket in the palm) and is part of the ulnar (Guyon) tunnel with the pisiform: the ulnar nerve and artery pass there. The deep motor branch of the ulnar nerve hooks around the base of the hook."},metacarpals:{id:"metacarpals",description:"The five metacarpal bones form the palm, numbered 1–5 from the thumb to the little finger. Each is a miniature long bone with a proximal base (carpal and intermetacarpal joints), a shaft, and a distal head (the knuckle of the metacarpophalangeal joint). The first metacarpal is shorter, stouter, and more mobile than the others. Tap a single metacarpal for a more specific note.",articulations:"Bases with the distal carpal row and with neighbouring metacarpals (the first is largely independent). Heads with the proximal phalanges at the MCP joints.",features:"The third metacarpal has a prominent styloid process at its base, a useful landmark. The necks of the metacarpals (especially the fifth) are common fracture sites (“boxer’s fracture”)."},metacarpal1:{id:"metacarpal1",description:"The first metacarpal is the short, stout metacarpal of the thumb. It is set in a more anterior and pronated plane than the other metacarpals, and its saddle-shaped base on the trapezium allows opposition, abduction, and circumduction.",articulations:"Trapezium at the first carpometacarpal (saddle) joint; the proximal phalanx of the thumb at the MCP joint. It has little or no intermetacarpal joint with the second metacarpal, which is why the thumb can move independently.",features:"The base is uniquely saddle-shaped. This joint is a very common site of osteoarthritis. The head is less spherical than those of metacarpals 2–5, and the thumb MCP joint often has sesamoids in the flexor pollicis brevis / adductor pollicis tendons."},metacarpal2:{id:"metacarpal2",description:"The second metacarpal, of the index finger, is usually the longest metacarpal. Its base is recessed and firmly locked to the trapezoid (and to the trapezium and capitate), making it the most stable ray of the hand.",articulations:"Mainly the trapezoid, with small facets for the trapezium, capitate, and third metacarpal. Distally, the proximal phalanx of the index finger.",features:"Limited motion at its carpometacarpal joint is the reason the index finger is a stable “pointer.” Extensor carpi radialis longus inserts on the dorsal base."},metacarpal3:{id:"metacarpal3",description:"The third metacarpal, of the middle finger, occupies the axis of the hand. Its base has a distinctive styloid process that projects proximally on the dorsal-radial side and articulates mainly with the capitate.",articulations:"Capitate (principal), plus the second and fourth metacarpals and a small facet sometimes for the trapezoid or hamate. Distally, the proximal phalanx of the middle finger.",features:"The styloid process is a palpable and radiographic landmark. Extensor carpi radialis brevis inserts on the dorsal base. Like the second, this carpometacarpal joint is relatively immobile."},metacarpal4:{id:"metacarpal4",description:"The fourth metacarpal, of the ring finger, is slightly shorter than the third and is more mobile at its base, contributing to cupping of the palm.",articulations:"Hamate and capitate proximally, the third and fifth metacarpals at the sides, and the proximal phalanx of the ring finger distally.",features:"A modest range of flexion–extension at the carpometacarpal joint lets the ring finger fold toward the palm. Isolated fourth-metacarpal fractures must be checked for rotational malalignment, which shows as finger overlap in flexion."},metacarpal5:{id:"metacarpal5",description:"The fifth metacarpal, of the little finger, is the most mobile of the medial four metacarpals. Motion at its carpometacarpal joint helps deepen the palmar cup and bring the little finger toward the thumb in opposition of the ulnar ray.",articulations:"Hamate proximally, the fourth metacarpal laterally, and the proximal phalanx of the little finger distally.",features:"The neck is a classic site of a “boxer’s fracture” (a punch on a clenched fist). Extensor carpi ulnaris inserts on the dorsal base. Check rotation after fracture: a malrotated fifth metacarpal makes the little finger overlap the ring finger in a fist."},hand_phalanges:{id:"hand_phalanges",description:"The phalanges of the hand are fourteen miniature long bones: each finger has a proximal, a middle, and a distal phalanx, while the thumb has only a proximal and a distal phalanx. Each has a base, a shaft, and a head (the distal phalanges end in a palmar tuft rather than a true head). In this model they are grouped as one selectable item.",articulations:"Proximal phalanges with the metacarpal heads at the metacarpophalangeal (MCP) joints, then PIP and DIP joints in the fingers, and a single interphalangeal (IP) joint in the thumb.",features:"MCP joints are condyloid (flexion–extension and some abduction–adduction); IP joints are hinges. The palmar bases of the middle and distal phalanges receive the flexor tendons; the dorsal bases of the distal and middle phalanges receive the extensor expansions (terminal and central slips). Mallet finger and boutonnière deformity follow injury to those slips."},calcaneus:{id:"calcaneus",description:"The calcaneus (heel bone) is the largest tarsal bone. It projects posteriorly as the heel and supports the talus on its superior articular facets. The posterior third is a robust tuberosity; the anterior end meets the cuboid. A shelf of bone on the medial side, the sustentaculum tali, supports the medial talus and is grooved inferiorly for flexor hallucis longus.",articulations:"Talus above (the subtalar joint, with anterior, middle, and posterior facets, and a sinus tarsi between them). Cuboid in front (calcaneocuboid joint, part of the midtarsal / Chopart joint).",features:"The posterior surface receives the calcaneal (Achilles) tendon on its middle third. The plantar surface has medial and lateral tubercles, origins of the first-layer plantar muscles, and a common site of plantar heel pain (plantar fascia / heel spur). Calcaneal fractures are often from a fall onto the heels."},talus:{id:"talus",description:"The talus transmits the whole weight of the body from the tibia to the heel and the midfoot. It has a head (navicular surface), a neck, and a body with a trochlear superior surface that fits the ankle mortise, plus a posterior process and a lateral process. Unusually among bones of this size, no muscle attaches to the talus — only ligaments and the joint capsule.",articulations:"Tibia and fibula above (ankle / talocrural joint). Calcaneus below (subtalar joint). Navicular in front (talonavicular part of the midtarsal joint).",features:"The blood supply is relatively precarious, running through the neck and ligamentous attachments, so fractures of the neck risk avascular necrosis of the body. The trochlea is wider in front, so the ankle is more stable in dorsiflexion. The head sits on the spring (plantar calcaneonavicular) ligament, a key support of the medial arch."},navicular:{id:"navicular",description:"The navicular is a boat-shaped bone of the midfoot, lying medial and just distal to the talar head. A prominent tuberosity on its medial plantar aspect is palpable about a finger’s breadth below and in front of the tip of the medial malleolus, and is the main insertion of tibialis posterior.",articulations:"Head of the talus proximally; the three cuneiforms distally; often a small facet for the cuboid laterally.",features:"It is a keystone of the medial longitudinal arch. An accessory navicular (an unfused ossicle at the tuberosity) is a common variant and can be painful. Stress fracture or osteonecrosis (Köhler’s disease in children) can affect this bone."},cuboid:{id:"cuboid",description:"The cuboid is the lateral midfoot bone, roughly cube-shaped, sitting between the calcaneus behind and the fourth and fifth metatarsals in front. A groove on its plantar surface, running behind a tuberosity (the cuboid tuberosity), lodges the tendon of fibularis (peroneus) longus.",articulations:"Calcaneus proximally (calcaneocuboid joint), lateral cuneiform and often the navicular medially, and the bases of the fourth and fifth metatarsals distally.",features:"It is a landmark on the lateral midfoot and part of the midtarsal (Chopart) and tarsometatarsal (Lisfranc) complexes. The peroneus longus groove is the distinctive plantar feature. Cuboid “syndrome” refers to a painful disruption of its alignment, often in athletes."},cuneiform_medial:{id:"cuneiform_medial",description:"The medial (first) cuneiform is the largest of the three cuneiforms, a wedge of bone with its base plantar and its thin edge dorsal — the opposite of the other two, which helps lock the transverse arch of the foot. It lies between the navicular and the first metatarsal on the medial midfoot.",articulations:"Navicular proximally, intermediate cuneiform laterally, and the first metatarsal (plus a small facet for the second metatarsal) distally.",features:"Tibialis anterior inserts on its medial and plantar surface (with the base of the first metatarsal). Tibialis posterior and peroneus longus also send slips here. It is a key element of the medial longitudinal and transverse arches."},cuneiform_intermediate:{id:"cuneiform_intermediate",description:"The intermediate (middle, second) cuneiform is the smallest of the three cuneiforms, a wedge with its base dorsal. It is recessed slightly proximal relative to its neighbours, so the base of the second metatarsal is mortised between the medial and lateral cuneiforms — a very stable arrangement.",articulations:"Navicular proximally, medial and lateral cuneiforms on each side, and the second metatarsal distally.",features:"The recessed position of this bone is the reason the second metatarsal is the most firmly anchored of the metatarsals, and why Lisfranc (tarsometatarsal) injuries often centre on the second-ray / intermediate-cuneiform joint."},cuneiform_lateral:{id:"cuneiform_lateral",description:"The lateral (third) cuneiform is intermediate in size between the other two, a wedge with its base dorsal. It sits between the intermediate cuneiform and the cuboid, and in front of the navicular.",articulations:"Navicular proximally, intermediate cuneiform medially, cuboid laterally, and the third metatarsal distally, with small facets for the second and sometimes the fourth metatarsal.",features:"It contributes to the transverse arch and to the tarsometatarsal complex of the middle ray. Isolated fracture is uncommon; injury is more often part of a midfoot (Lisfranc) pattern."},metatarsals:{id:"metatarsals",description:"The five metatarsal bones form the forefoot, numbered 1–5 from the hallux (big toe) to the little toe. Each has a proximal base, a shaft, and a distal head. The first is short and stout; the second is usually the longest; the fifth has a prominent tuberosity at its base. Tap a single metatarsal for a more specific note.",articulations:"Bases with the distal tarsal row (cuneiforms and cuboid) and with neighbouring metatarsals, at the tarsometatarsal (Lisfranc) joints. Heads with the proximal phalanges at the metatarsophalangeal joints.",features:"The heads form the ball of the foot and bear weight in the stance phase, especially the first and second. The second metatarsal is the most firmly mortised at its base and a common site of stress fracture."},metatarsal1:{id:"metatarsal1",description:"The first metatarsal is the shortest and thickest metatarsal, built to carry a large share of forefoot weight. Its broad head, often with plantar sesamoids in the tendons of flexor hallucis brevis, forms the medial part of the ball of the foot.",articulations:"Medial cuneiform at its base (and sometimes a small facet for the second metatarsal). Distally, the proximal phalanx of the hallux at the first MTP joint.",features:"Tibialis anterior inserts on the medial plantar base (with the medial cuneiform); peroneus longus inserts on the lateral plantar base. Hallux valgus and osteoarthritis of the first MTP joint (hallux rigidus) are common clinical problems around this bone."},metatarsal2:{id:"metatarsal2",description:"The second metatarsal is usually the longest. Its base is recessed and locked between the medial and lateral cuneiforms against the intermediate cuneiform, making it the most stable ray of the foot — and a frequent site of stress fracture when load is high or the first ray is insufficient.",articulations:"Intermediate cuneiform (and facets for the medial and lateral cuneiforms and the third metatarsal) at the base; the proximal phalanx of the second toe at the MTP joint.",features:"The mortise around this base is the keystone of the Lisfranc joint; a gap between the first and second metatarsal bases on an injury film is a warning of midfoot instability. March (stress) fractures classically affect this shaft."},metatarsal3:{id:"metatarsal3",description:"The third metatarsal occupies the middle of the forefoot. It is of intermediate length and is relatively stable at its base against the lateral cuneiform.",articulations:"Lateral cuneiform proximally, the second and fourth metatarsals at the sides, and the proximal phalanx of the third toe distally.",features:"It contributes to the central ray of the transverse and longitudinal arches. Isolated injury is less common than at the second or fifth metatarsal, but it can be involved in Lisfranc patterns and in mid-shaft stress fractures."},metatarsal4:{id:"metatarsal4",description:"The fourth metatarsal is slightly shorter than the third and slightly more mobile at its base, articulating mainly with the cuboid. It helps form the lateral part of the forefoot and the transverse arch.",articulations:"Cuboid (and often a small facet for the lateral cuneiform) proximally, the third and fifth metatarsals at the sides, and the proximal phalanx of the fourth toe distally.",features:"Mobility at this tarsometatarsal joint is greater than at the second and third, contributing to the adaptability of the lateral midfoot on uneven ground."},metatarsal5:{id:"metatarsal5",description:"The fifth metatarsal is the most lateral, distinguished by a tuberosity (styloid process) at the base that is easily palpated along the lateral midfoot. The tuberosity is the insertion of fibularis (peroneus) brevis and a classic site of avulsion fracture.",articulations:"Cuboid at the base, the fourth metatarsal medially, and the proximal phalanx of the little toe distally.",features:"Three different fractures are worth distinguishing: an avulsion of the tuberosity, a Jones fracture at the metaphyseal–diaphyseal junction (which is slower to heal), and a more distal shaft stress fracture. Fibularis brevis and, partly, fibularis tertius attach at the base."},foot_phalanges:{id:"foot_phalanges",description:"The phalanges of the foot are fourteen bones in the usual pattern: the hallux has a proximal and a distal phalanx; the lesser toes have proximal, middle, and distal phalanges (the middle and distal phalanges of the fifth toe are sometimes fused). They are shorter than their counterparts in the hand. In this model they are grouped as one selectable item.",articulations:"Proximal phalanges with the metatarsal heads at the MTP joints; then PIP and DIP joints in the lesser toes, and a single IP joint in the hallux.",features:"The first proximal phalanx and the sesamoids under the first metatarsal head are important in push-off. Hammer toe, claw toe, and hallux valgus alter the alignment of these joints. The distal phalanx of the hallux receives the tendon of flexor hallucis longus on its plantar base, a powerful contribution to the final push-off of gait."}};function Au(i){return ay[i]}function uy(i){return hy[i]}const dy=["see","hint","memory"],Th={see:"See it",hint:"Hint",memory:"Memory"},Ru={skull:"SKULL",spine:"SPINE",thorax:"THORAX",upper:"UPPER LIMB",lower:"LOWER LIMB",pelvis:"PELVIS"},Cu={neck_back:"NECK & BACK",chest_abdomen:"CHEST & ABDOMEN",shoulder_arm:"SHOULDER & ARM",hip_thigh:"HIP & THIGH",lower_leg:"LOWER LEG"},fy=[8,12,20,0],py=document.querySelector("#app");py.innerHTML=`
  <div class="stage"><canvas id="main-canvas"></canvas></div>
  <div class="side-views" id="side-views" hidden>
    <div class="side-view side-view--left"><canvas id="side-left"></canvas></div>
    <div class="side-view side-view--right"><canvas id="side-right"></canvas></div>
  </div>

  <div class="chrome chrome--top" id="chrome-top" hidden>
    <div class="chrome-left">
      <span class="pill pill--solid" id="pill-subject">Bones</span>
      <span class="pill" id="pill-mode">Learn</span>
    </div>
    <div class="chrome-center">
      <span><strong id="stat-acc">100%</strong> accuracy</span>
      <span><strong id="stat-progress">0 / 0</strong></span>
    </div>
    <div class="chrome-right">
      <button type="button" class="pill pill--btn" id="btn-menu-top" title="Menu">≡ menu</button>
      <span class="pill" id="pill-round">round 1/3</span>
    </div>
  </div>

  <div class="status" id="status">Loading skeleton…</div>

  <!-- Start menu (bonetype-style glass panel) -->
  <div class="menu-overlay" id="menu-overlay">
    <div class="menu-panel" id="menu-panel">
      <header class="menu-header">
        <h1>anatomy 3d</h1>
        <p class="menu-tag">learn the skeleton by typing it</p>
      </header>

      <section class="menu-section">
        <h2>Explore</h2>
        <button type="button" class="mode-card mode-card--wide" id="btn-view">
          <span class="mode-key">V</span>
          <div>
            <span class="mode-title">View</span>
            <span class="mode-sub">solid model · tap a bone or muscle for origin, insertion, and a short description</span>
          </div>
        </button>
      </section>

      <section class="menu-section">
        <h2>Subject</h2>
        <div class="mode-grid mode-grid--subjects">
          <button type="button" class="mode-card mode-card--on" data-subject="bones" id="subject-bones">
            <span class="mode-key">B</span>
            <span class="mode-title">Bones</span>
            <span class="mode-sub" id="subject-count">0 · 6 regions</span>
          </button>
          <button type="button" class="mode-card" data-subject="muscles" id="subject-muscles">
            <span class="mode-key">M</span>
            <span class="mode-title">Muscles</span>
            <span class="mode-sub" id="muscle-count">0 · 5 regions</span>
          </button>
        </div>
      </section>

      <section class="menu-section">
        <h2>Mode</h2>
        <button type="button" class="mode-card mode-card--wide" data-mode="combined" id="mode-combined">
          <span class="mode-key">L</span>
          <div>
            <span class="mode-title">Combined / Learn</span>
            <span class="mode-sub">all three levels back to back: see it → hint → memory</span>
          </div>
        </button>
        <div class="mode-grid mode-grid--levels">
          <button type="button" class="mode-card" data-mode="see">
            <span class="mode-title">Level 1: See it</span>
            <span class="mode-sub">full name shown</span>
          </button>
          <button type="button" class="mode-card" data-mode="hint">
            <span class="mode-title">Level 2: Hint</span>
            <span class="mode-sub">first letter + meaning</span>
          </button>
          <button type="button" class="mode-card mode-card--on" data-mode="memory" id="mode-memory">
            <span class="mode-title">Level 3: Memory</span>
            <span class="mode-sub">no hints</span>
          </button>
        </div>
      </section>

      <section class="menu-section">
        <div class="menu-section-head">
          <h2>Quick filters</h2>
          <span class="menu-count" id="pool-count">0 of 0 bones</span>
        </div>
        <div class="filter-bar filter-bar--presets" id="menu-presets"></div>
        <div class="filter-bar" id="menu-muscle-regions" hidden></div>
        <button type="button" class="more-filters-toggle" id="more-filters-toggle">More filters</button>
        <div class="more-filters" id="more-filters" hidden>
          <div class="filter-bar" id="menu-regions"></div>
          <div class="filter-bar filter-bar--parts" id="menu-parts"></div>
        </div>
      </section>

      <section class="menu-section">
        <h2>Per session</h2>
        <div class="session-row" id="session-counts"></div>
      </section>

      <button type="button" class="start-btn" id="start-btn">Start <kbd>↵</kbd></button>
    </div>
  </div>

  <!-- View-mode study panel -->
  <aside class="view-panel" id="view-panel" hidden>
    <div class="view-pick-stack" id="view-pick-stack" hidden>
      <div class="view-pick-stack-label" id="view-pick-stack-label">Also here</div>
      <div class="view-pick-chips" id="view-pick-chips" role="list"></div>
    </div>
    <button type="button" class="view-panel-handle" id="view-panel-toggle" aria-expanded="false">
      <span class="view-panel-handle-bar"></span>
      <span id="view-panel-handle-label">Tap a structure</span>
    </button>
    <div class="view-panel-body" id="view-panel-body">
      <p class="view-empty" id="view-empty">Tap a bone or muscle to see its name, attachments, and a short description. Tap again near the same spot to cycle through what is underneath, or pick from the also-here list. Drag to rotate, scroll to zoom. Tap empty space to clear.</p>
      <div class="view-card" id="view-card" hidden>
        <div class="view-kicker">
          <span id="view-kind"></span>
          <span class="view-dot">·</span>
          <span id="view-region"></span>
          <span id="view-side" class="view-side" hidden></span>
        </div>
        <h2 id="view-name"></h2>
        <p class="view-desc" id="view-desc"></p>
        <dl class="view-facts" id="view-facts"></dl>
        <p class="view-note" id="view-note" hidden>
          Labels mark the closest points between these BodyParts3D meshes at each named attachment — a close approximation, not a clinical landmark atlas.
        </p>
      </div>
    </div>
  </aside>

  <!-- In-play typing HUD -->
  <div class="hud" id="play-hud" hidden>
    <div class="prompt-block" id="prompt-block">
      <div class="type-label" id="type-label">TYPE IT · SPINE</div>
      <div class="target-word" id="target-word"></div>
      <div class="gloss-line" id="gloss-line"></div>
      <p class="tap-hint" id="tap-hint">Tap to type</p>
    </div>
  </div>

  <input
    id="hidden-input"
    class="hidden-input"
    type="text"
    autocomplete="off"
    autocapitalize="off"
    autocorrect="off"
    spellcheck="false"
    enterkeyhint="done"
    aria-label="Type the bone name"
  />

  <div class="footer-bar">
    <span class="footer-tips" id="footer-tips">TAB REVEAL · ESC MENU · DRAG ROTATE · SCROLL ZOOM</span>
    <span class="footer-meta" id="footer-meta">MODELS: PROCEDURAL · BODY PARTS 3D</span>
  </div>
  <div class="footer-attr">
    BodyParts3D, © The Database Center for Life Science / CC BY 4.0
  </div>
`;const Ks=document.querySelector("#main-canvas"),my=document.querySelector("#side-left"),gy=document.querySelector("#side-right"),dl=document.querySelector("#side-views"),yt=document.querySelector("#status"),ar=document.querySelector("#menu-overlay"),fl=document.querySelector("#play-hud"),Fn=document.querySelector("#chrome-top"),Eh=document.querySelector("#type-label"),Gi=document.querySelector("#target-word"),Wi=document.querySelector("#gloss-line"),_y=document.querySelector("#prompt-block"),pt=document.querySelector("#hidden-input"),vy=document.querySelector("#stat-acc"),by=document.querySelector("#stat-progress"),Lu=document.querySelector("#pill-mode"),yy=document.querySelector("#pill-round"),wh=document.querySelector("#pool-count"),Bo=document.querySelector("#subject-count"),xy=document.querySelector("#footer-meta"),Ah=document.querySelector("#menu-regions"),Rh=document.querySelector("#menu-parts"),Xr=document.querySelector("#menu-presets"),Pa=document.querySelector("#menu-muscle-regions"),My=document.querySelector("#more-filters"),za=document.querySelector("#more-filters-toggle"),zo=document.querySelector("#muscle-count"),Ch=document.querySelector("#session-counts"),Sy=document.querySelector("#start-btn"),Pu=document.querySelector("#pill-subject"),Ty=document.querySelector("#btn-view"),vn=document.querySelector("#view-panel"),qa=document.querySelector("#view-panel-toggle"),Lh=document.querySelector("#view-panel-handle-label"),Ph=document.querySelector("#view-empty"),Ih=document.querySelector("#view-card"),Ey=document.querySelector("#view-kind"),wy=document.querySelector("#view-region"),Ia=document.querySelector("#view-side"),Ay=document.querySelector("#view-name"),Dh=document.querySelector("#view-desc"),Nh=document.querySelector("#view-facts"),jr=document.querySelector("#view-note"),Ho=document.querySelector("#view-pick-stack"),Ya=document.querySelector("#view-pick-chips"),Iu=document.querySelector("#footer-tips"),it=new ny({mainCanvas:Ks,sideCanvases:[my,gy]});window.__anatomyScene=it;const Pt=new Set(Hs.map(i=>i.id)),It=new Set(Oh.map(i=>i.id)),dn=new Set(ei.map(i=>i.id));let us="all",Bs=!1;const B={playing:!1,viewing:!1,mode:"memory",levels:["memory"],levelIndex:0,queue:[],index:0,typed:"",revealing:!1,correct:0,attempts:0,finished:!1,sessionCount:0,subject:"bones"};function Du(){return us!=="custom"?Wo(us).bones:Ha(Pt,It)}function pl(){return qu(dn)}function Ry(i){return{id:i.id,displayName:i.displayName,hint:i.hint,meshNames:i.meshNames,regionLabel:Ru[i.region],aliases:i.aliases,match:e=>Wu(e,i)}}function Cy(i){return{id:i.id,displayName:i.displayName,hint:i.hint,meshNames:i.meshNames,regionLabel:Cu[i.region],aliases:i.aliases,match:e=>ju(e,i)}}function Ly(){return B.subject==="muscles"?pl().map(Cy):Du().map(Ry)}function ml(){return B.levels[B.levelIndex]??"memory"}function vs(){return B.queue[B.index]??null}function vi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Nu(i){return i.displayName}function js(i){return i.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"")}function gl(i,e){const t=js(i);if(!t)return-1;const n=e.map(js).filter(Boolean);if(n.some(a=>a.startsWith(t)))return-1;let s=0;for(const a of n){let r=0;for(;r<t.length&&r<a.length&&t[r]===a[r];)r++;r>s&&(s=r)}return s}function _l(i){return[i.displayName,...i.aliases]}function Py(i){if(!i){Gi.innerHTML='<span class="tw-done">Session complete</span>',Gi.classList.add("reveal");return}if(B.revealing){Gi.classList.add("reveal"),Gi.innerHTML=`<span class="tw-done">${vi(i.displayName)}</span>`;return}Gi.classList.remove("reveal");const e=Nu(i),t=ml(),n=js(B.typed),s=gl(B.typed,_l(i)),a=[...e];let r="",o=0,l=!1;for(const c of a){if(/\s/.test(c)){r+='<span class="tw-space">&nbsp;</span>';continue}if(o<n.length){const h=n[o],u=s>=0&&o>=s;r+=`<span class="${u?"tw-wrong":"tw-on"}">${vi(h)}</span>`}else{let h="tw-blank",u="_";(t==="see"||t==="hint"&&o===0)&&(h="tw-dim",u=vi(c.toLowerCase())),l?r+=`<span class="${h}">${u}</span>`:(r+=`<span class="${h} tw-caret">${u}</span>`,l=!0)}o++}n.length>o&&(r+=[...n.slice(o)].map(c=>`<span class="tw-wrong">${vi(c)}</span>`).join("")),l||(r+='<span class="tw-cursor"></span>'),Gi.innerHTML=r}function Iy(i){const e=ml();if(!i||B.finished){Wi.textContent="",Wi.classList.remove("show");return}B.revealing||e==="see"||e==="hint"?(Wi.textContent=i.hint,Wi.classList.add("show")):(Wi.textContent="",Wi.classList.remove("show"))}function Bt(){const i=vs(),e=B.queue.length,t=ml(),n=B.attempts===0?100:Math.round(B.correct/B.attempts*100);vy.textContent=`${n}%`,by.textContent=B.finished?`${e} / ${e}`:`${Math.min(B.index+1,e)} / ${e}`;const s=B.mode==="combined"?"Learn":Th[B.mode];Lu.textContent=s,yy.textContent=B.mode==="combined"?`round ${B.levelIndex+1}/${B.levels.length}`:Th[t],i&&!B.finished?Eh.textContent=`TYPE IT · ${i.regionLabel}`:B.finished&&(Eh.textContent="COMPLETE · TAP OR ESC FOR MENU"),Pu.textContent=B.subject==="muscles"?"Muscles":"Bones",Iy(i),Py(i),!B.revealing&&document.activeElement===pt&&pt.value!==B.typed&&(pt.value=B.typed)}function Mi(){const i=vs();i&&it.setTarget(i.meshNames)}function Si(){window.setTimeout(()=>{try{pt.focus({preventScroll:!0})}catch{pt.focus()}},0)}function Kn(i){return new Promise(e=>setTimeout(e,i))}function hn(){B.viewing&&(it.exitView(),B.viewing=!1),B.playing=!1,B.revealing=!1,ar.hidden=!1,fl.hidden=!0,vn.hidden=!0,vn.classList.remove("is-expanded"),yl(),Fn.hidden=!0,Fn.classList.remove("is-view"),Fn.setAttribute("hidden",""),dl.hidden=!0,pt.value="",yt.style.display="none",Iu.textContent="TAB REVEAL · ESC MENU · DRAG ROTATE · SCROLL ZOOM",it.setSubject(B.subject),it.showMenuView(),pn(),si()}function Dy(){const i=new Map,e=t=>{for(const n of t.meshNames){const s=i.get(n);(!s||t.meshNames.length<s.meshNames.length)&&i.set(n,t)}};for(const t of At)e({kind:"bone",id:t.id,displayName:t.displayName,regionLabel:Ru[t.region],meshNames:t.meshNames});for(const t of ti)e({kind:"muscle",id:t.id,displayName:t.displayName,regionLabel:Cu[t.region],meshNames:t.meshNames});return i}const Ny=Dy();function Vo(i){return i.startsWith("vertebra_")?null:/_l\d+$/.test(i)||i.endsWith("_l")?"l":/_r\d+$/.test(i)||i.endsWith("_r")?"r":null}function Xi(i,e){return`<div class="view-fact"><dt>${vi(i)}</dt><dd>${vi(e)}</dd></div>`}function Uy(i){if(!i){Ph.hidden=!1,Ih.hidden=!0,jr.hidden=!0,Lh.textContent="Tap a structure",vn.classList.remove("has-selection");return}if(Ph.hidden=!0,Ih.hidden=!1,vn.classList.add("has-selection"),Ey.textContent=i.kind==="muscle"?"Muscle":"Bone",wy.textContent=i.regionLabel,i.side?(Ia.hidden=!1,Ia.textContent=i.side==="l"?"Left":"Right"):(Ia.hidden=!0,Ia.textContent=""),Ay.textContent=i.displayName,Lh.textContent=i.displayName,i.kind==="muscle"){const e=Au(i.id);Dh.textContent=(e==null?void 0:e.description)??i.displayName;const t=[];e!=null&&e.origin&&t.push(Xi("Origin",e.origin)),e!=null&&e.insertion&&t.push(Xi("Insertion",e.insertion)),e!=null&&e.action&&t.push(Xi("Action",e.action)),e!=null&&e.innervation&&t.push(Xi("Innervation",e.innervation)),Nh.innerHTML=t.join(""),jr.hidden=!e}else{const e=uy(i.id);Dh.textContent=(e==null?void 0:e.description)??i.displayName;const t=[];e!=null&&e.articulations&&t.push(Xi("Articulations",e.articulations)),e!=null&&e.features&&t.push(Xi("Notable features",e.features)),Nh.innerHTML=t.join(""),jr.hidden=!0}}function Oy(i){if(i.kind!=="muscle")return[];const e=Au(i.id);if(!e)return[];const t=i.side??"r";return e.sitesForSide(t)}function vl(i){if(Uy(i),!i){it.clearViewSelection();return}it.setViewSelection(i.meshNames,Oy(i))}function Fy(i){return`${i.id}:${i.side??""}`}function ky(i){if(!i.side)return i.meshNames;const e=i.meshNames.filter(t=>Vo(t)===i.side||Vo(t)===null);return e.length>0?e:[i.clickedMesh]}function By(i){const e=Ny.get(i);return e?{...e,side:Vo(i),clickedMesh:i}:null}function zy(i){const e=[],t=new Set;for(const n of i){const s=By(n.meshName);if(!s)continue;const a=Fy(s);t.has(a)||(t.add(a),e.push(s))}return e}const Uh=24;let bi=[],$a=-1,Uu=0,Ou=0,bl=!1;function yl(){bi=[],$a=-1,bl=!1,Ya.replaceChildren(),Ho.hidden=!0}function Hy(i){return i.side?`${i.displayName} · ${i.side==="l"?"L":"R"}`:i.displayName}function Vy(i,e){if(i.length<=1){Ya.replaceChildren(),Ho.hidden=!0;return}Ho.hidden=!1;const t=i.map((n,s)=>{const a=s===e;return`<button type="button" class="view-pick-chip${a?" view-pick-chip--on":""}" data-stack-index="${s}" aria-pressed="${a}" role="listitem">${vi(Hy(n))}</button>`}).join("");Ya.innerHTML=t}function Go(i,e,t,n){const s=i[e];s&&(bi=i,$a=e,t!=null&&n!=null&&(Uu=t,Ou=n,bl=!0),vl(s),it.frameViewSelection(ky(s)),Vy(i,e),vn.classList.contains("is-expanded")||(vn.classList.add("is-expanded"),qa.setAttribute("aria-expanded","true")))}function Gy(i,e){if(bl&&bi.length>1&&$a>=0){const s=i-Uu,a=e-Ou;if(s*s+a*a<=Uh*Uh){const r=($a+1)%bi.length;Go(bi,r,i,e);return}}const t=it.pickAllAt(i,e),n=zy(t);if(n.length===0){vl(null),yl();return}Go(n,0,i,e)}async function xl(){jt(),yt.style.display="",yt.classList.remove("error"),yt.textContent="Loading study model…",B.playing=!1,B.revealing=!1,B.viewing=!0,pt.value="",ar.hidden=!0,fl.hidden=!0,dl.hidden=!0,Fn.hidden=!1,Fn.removeAttribute("hidden"),Fn.classList.add("is-view"),Pu.textContent="Study",Lu.textContent="View",Iu.textContent="TAP TO SELECT · TAP AGAIN TO CYCLE · DRAG ROTATE · SCROLL ZOOM · ESC MENU",vn.hidden=!1,vn.classList.remove("is-expanded"),qa.setAttribute("aria-expanded","false"),yl(),vl(null);try{await it.enterView()}catch(i){console.error(i),yt.classList.add("error"),yt.textContent="Failed to load study model";return}B.viewing&&(yt.style.display="none")}function Wy(i){return i==="combined"?[...dy]:[i]}async function zs(){const i=Ly();if(i.length===0)return;jt(),B.subject==="muscles"?(yt.style.display="",yt.textContent="Loading muscles…",await it.setSubjectAsync("muscles"),yt.style.display="none"):it.setSubject("bones");let e=Xu(i);B.sessionCount>0&&e.length>B.sessionCount&&(e=e.slice(0,B.sessionCount)),B.playing=!0,B.levels=Wy(B.mode),B.levelIndex=0,B.queue=e,B.index=0,B.typed="",B.revealing=!1,B.correct=0,B.attempts=0,B.finished=!1,pt.value="",ar.hidden=!0,fl.hidden=!1,Fn.hidden=!1,dl.hidden=!1,yt.style.display="none",Mi(),Bt(),Si()}async function Fu(){if(!(!vs()||B.revealing)){if(B.revealing=!0,B.correct+=1,B.attempts+=1,sy(),pt.value="",Bt(),await Kn(900),B.revealing=!1,B.typed="",pt.value="",B.index+=1,B.index>=B.queue.length){if(B.levelIndex<B.levels.length-1){B.levelIndex+=1,B.index=0,Mi(),Bt(),Si();return}B.finished=!0,Bt();return}Mi(),Bt(),Si()}}function Xy(i){if(jt(),!B.playing)return;if(B.finished){hn();return}if(B.revealing)return;const e=vs();e&&(B.typed+=i,gl(B.typed,_l(e))>=0?wu():Eu(),Bt(),e.match(B.typed)&&Fu())}function jy(){!B.playing||B.revealing||B.finished||(B.typed=B.typed.slice(0,-1),Bt())}function qy(){!B.playing||B.revealing||B.finished||!vs()||(B.attempts+=1,B.revealing=!0,B.typed="",pt.value="",Bt(),(async()=>{if(await Kn(1400),B.revealing=!1,B.index+=1,B.index>=B.queue.length){if(B.levelIndex<B.levels.length-1){B.levelIndex+=1,B.index=0,Mi(),Bt(),Si();return}B.finished=!0,Bt();return}Mi(),Bt(),Si()})())}function si(){if(B.subject==="muscles"){const t=pl().length,n=ti.length;wh.textContent=`${t} of ${n} muscles`,zo.textContent=`${n} · ${ei.length} regions`,Bo.textContent=`${At.length} · ${Hs.length} regions`}else{const t=Du().length,n=At.length;wh.textContent=`${t} of ${n} bones`,Bo.textContent=`${n} · ${Hs.length} regions`,zo.textContent=`${ti.length} · ${ei.length} regions`}const i=it.listMeshNames(),e=i.filter(t=>t.startsWith("rib_")).length;i.filter(t=>t.startsWith("trap_")||t.startsWith("delt_")||t.startsWith("scm_")||t.startsWith("glut_")).length,xy.textContent=`MODELS: BODY PARTS 3D · ${i.length} MESHES · ${e} RIBS · ${ti.length} MUSCLES`}function Ka(i){us=i;const{regions:e,parts:t}=Wo(i);Pt.clear(),It.clear();for(const n of e)Pt.add(n);for(const n of t)It.add(n)}function pn(){const i=B.subject==="bones";if(Xr.hidden=!i,Pa.hidden=i,za.hidden=!i,My.hidden=!i||!Bs,za.textContent=Bs?"Hide filters":"More filters",za.classList.toggle("more-filters-toggle--open",Bs),document.querySelectorAll("[data-subject]").forEach(t=>{t.classList.toggle("mode-card--on",t.dataset.subject===B.subject)}),Xr.innerHTML="",i)for(const{id:t,label:n}of Gu){const s=document.createElement("button");s.type="button";const a=us===t;s.className="filter-chip filter-chip--preset"+(a?" filter-chip--on":"");const r=Wo(t).bones.length;s.innerHTML=`<span>${n}</span><em>${r}</em>`,s.addEventListener("pointerdown",o=>{o.preventDefault(),jt(),Ka(t),pn(),si()}),Xr.appendChild(s)}if(Pa.innerHTML="",!i){const t=document.createElement("button");t.type="button";const n=dn.size===ei.length;t.className="filter-chip"+(n?" filter-chip--on":""),t.innerHTML=`<span>All</span><em>${ti.length}</em>`,t.addEventListener("pointerdown",s=>{s.preventDefault();for(const a of ei)dn.add(a.id);pn(),si()}),Pa.appendChild(t);for(const{id:s,label:a}of ei){const r=document.createElement("button");r.type="button";const o=ti.filter(l=>l.region===s).length;r.className="filter-chip"+(dn.has(s)?" filter-chip--on":""),r.innerHTML=`<span>${a}</span><em>${o}</em>`,r.addEventListener("pointerdown",l=>{if(l.preventDefault(),jt(),dn.has(s)){if(dn.size<=1)return;dn.delete(s)}else dn.add(s);pl().length===0&&dn.add(s),pn(),si()}),Pa.appendChild(r)}}const e={};for(const t of At)e[t.region]=(e[t.region]??0)+1;Ah.innerHTML="";for(const{id:t,label:n}of Hs){const s=document.createElement("button");s.type="button",s.className="filter-chip"+(Pt.has(t)?" filter-chip--on":""),s.innerHTML=`<span>${n}</span><em>${e[t]??0}</em>`,s.addEventListener("pointerdown",a=>{a.preventDefault(),jt(),Yy(t)}),Ah.appendChild(s)}Rh.innerHTML="";for(const{id:t,label:n}of Oh){const s=document.createElement("button");s.type="button",s.className="filter-chip filter-chip--part"+(It.has(t)?" filter-chip--on":"");const a=At.filter(r=>Pt.has(r.region)&&r.part===t).length;s.innerHTML=`<span>${n}</span><em>${a}</em>`,s.addEventListener("pointerdown",r=>{r.preventDefault(),jt(),$y(t)}),Rh.appendChild(s)}Ch.innerHTML="";for(const t of fy){const n=document.createElement("button");n.type="button",n.className="session-chip"+(B.sessionCount===t?" session-chip--on":""),n.textContent=t===0?"All":String(t),n.addEventListener("pointerdown",s=>{s.preventDefault(),B.sessionCount=t,pn()}),Ch.appendChild(n)}document.querySelectorAll("[data-mode]").forEach(t=>{t.classList.toggle("mode-card--on",t.dataset.mode===B.mode)})}function Yy(i){us="custom";const e=Pt.has(i);if(e){if(Pt.size<=1)return;Pt.delete(i)}else Pt.add(i);if(Ha(Pt,It).length===0){It.clear();for(const n of At)Pt.has(n.region)&&It.add(n.part)}Ha(Pt,It).length===0&&(e?Pt.add(i):Pt.delete(i)),pn(),si()}function $y(i){us="custom";const e=It.has(i);if(e){if(It.size<=1)return;It.delete(i)}else It.add(i);Ha(Pt,It).length===0&&(e?It.add(i):It.delete(i)),pn(),si()}document.querySelectorAll("[data-mode]").forEach(i=>{i.addEventListener("pointerdown",e=>{e.preventDefault(),jt(),B.mode=i.dataset.mode,pn()})});document.querySelectorAll("[data-subject]").forEach(i=>{i.addEventListener("pointerdown",e=>{e.preventDefault(),jt();const t=i.dataset.subject;!t||t===B.subject||(B.subject=t,(async()=>(t==="muscles"&&(yt.style.display="",yt.textContent="Loading muscles…",yt.classList.remove("error")),await it.setSubjectAsync(t),yt.style.display="none",it.showMenuView(),pn(),si()))())})});za.addEventListener("pointerdown",i=>{i.preventDefault(),Bs=!Bs,pn()});Sy.addEventListener("pointerdown",i=>{i.preventDefault(),zs()});Ty.addEventListener("pointerdown",i=>{i.preventDefault(),xl()});qa.addEventListener("pointerdown",i=>{i.preventDefault();const e=!vn.classList.contains("is-expanded");vn.classList.toggle("is-expanded",e),qa.setAttribute("aria-expanded",e?"true":"false")});Ya.addEventListener("pointerdown",i=>{const e=i.target.closest("button[data-stack-index]");if(!e)return;i.preventDefault(),i.stopPropagation();const t=Number(e.dataset.stackIndex);!Number.isInteger(t)||!bi[t]||Go(bi,t)});document.querySelector("#btn-menu-top").addEventListener("pointerdown",i=>{i.preventDefault(),hn()});window.addEventListener("keydown",i=>{i.key==="Escape"&&(B.playing||B.viewing)&&(i.preventDefault(),hn())},!0);window.addEventListener("keydown",i=>{if(jt(),i.key==="Escape"){i.preventDefault(),(B.playing||B.viewing)&&hn();return}if(!B.playing&&!B.viewing&&(i.key==="v"||i.key==="V")&&document.activeElement!==pt){i.preventDefault(),xl();return}if(i.key==="Tab"&&B.playing){i.preventDefault(),qy();return}if(!B.playing){if(B.viewing)return;i.key==="Enter"&&(i.preventDefault(),zs());return}if(!(i.metaKey||i.ctrlKey||i.altKey)){if(document.activeElement===pt&&i.key!=="Escape"){B.finished&&i.key.length===1&&(i.preventDefault(),hn());return}if(B.finished){i.preventDefault(),hn();return}if(i.key==="Backspace"){i.preventDefault(),jy();return}i.key.length===1&&/[a-zA-Z0-9 \-]/.test(i.key)&&(i.preventDefault(),Xy(i.key.toLowerCase()))}});pt.addEventListener("input",()=>{if(jt(),!B.playing){pt.value="";return}if(B.finished){pt.value="",hn();return}if(B.revealing){pt.value="";return}const i=pt.value,e=i.toLowerCase().replace(/[^a-z0-9 \-]/g,"");e!==i&&(pt.value=e);const t=vs(),n=B.typed,s=js(e).length>js(n).length;B.typed=e,s&&t&&gl(B.typed,_l(t))>=0?wu():e.length!==n.length&&Eu(),Bt(),t&&t.match(B.typed)&&Fu()});pt.addEventListener("keydown",i=>{i.key==="Enter"&&i.preventDefault()});_y.addEventListener("pointerdown",i=>{if(i.preventDefault(),jt(),B.finished){hn();return}Si()});const Za=12;let Ml=0,Sl=0,ds=!1;Ks.addEventListener("pointerdown",i=>{jt(),Ml=i.clientX,Sl=i.clientY,ds=!0,B.playing&&Si()});Ks.addEventListener("pointermove",i=>{if(!ds)return;const e=i.clientX-Ml,t=i.clientY-Sl;e*e+t*t>Za*Za&&(ds=!1)});Ks.addEventListener("pointerup",i=>{const e=ds;if(ds=!1,!e||!B.viewing)return;const t=i.clientX-Ml,n=i.clientY-Sl;t*t+n*n>Za*Za||Gy(i.clientX,i.clientY)});Ks.addEventListener("pointercancel",()=>{ds=!1});async function Ky(i){if(await Kn(500),i==="menu"||i==="ribs"){hn(),Fn.hidden=!0,i==="ribs"?(ar.hidden=!0,it.setTarget(["rib_l1","rib_r1","rib_l2","rib_r2","rib_l3","rib_r3","rib_l4","rib_r4","rib_l5","rib_r5","rib_l6","rib_r6","rib_l7","rib_r7","rib_l8","rib_r8","rib_l9","rib_r9","rib_l10","rib_r10","rib_l11","rib_r11","rib_l12","rib_r12","sternum_body","sternum_manubrium","sternum_xiphoid"]),await Kn(300),it.freezeUprightProof(),it.showMenuView(),it.freezeUprightProof()):(it.freezeUprightProof(),it.showMenuView());return}if(i==="typing"){B.subject="bones",B.mode="see",B.sessionCount=8,Ka("spine_ribs"),await zs();const e=B.queue.find(t=>t.id.startsWith("rib"))??B.queue[0];e&&(B.queue=[e,...B.queue.filter(t=>t!==e)],B.index=0,B.typed=Nu(e).replace(/\s+/g,"").slice(0,3).toLowerCase(),Mi(),Bt()),await Kn(400)}if(i==="filters"){hn(),Fn.hidden=!0,it.freezeUprightProof(),it.showMenuView();return}if(i==="hand"||i==="bones-ul-ll"){B.subject="bones",Ka(i==="hand"?"hand_wrist":"upper"),B.mode="see",B.sessionCount=6,await zs(),await Kn(500),it.freezeUprightProof();return}if(i==="muscles"||i==="muscles-slice"){B.subject="muscles",it.setSubject("muscles");for(const t of ei)dn.add(t.id);B.mode="see",B.sessionCount=6,await zs();const e=B.queue.find(t=>t.id==="deltoid")??B.queue[0];e&&(B.queue=[e,...B.queue.filter(t=>t!==e)],B.index=0,Mi(),Bt()),await Kn(500);return}if(i==="view"){await xl(),await Kn(400);return}}(async()=>{try{await it.load(ji("models/thorax.glb")),yt.style.display="none";const i=it.listMeshNames(),e=i.filter(n=>n.startsWith("rib_"));console.info("[skeleton] meshes",i.length,"ribs",e.length),Ka("all"),Bo.textContent=`${At.length} · ${Hs.length} regions`,zo.textContent=`${ti.length} · ${ei.length} regions`,hn(),si();const t=new URLSearchParams(location.search).get("qa");t&&await Ky(t)}catch(i){console.error(i),yt.classList.add("error"),yt.textContent="Failed to load 3D model"}})();
