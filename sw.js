// Service worker mínimo: deixa o Sonar instalável. Não guarda nada em cache (sempre busca a versão nova).
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
