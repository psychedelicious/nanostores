import { createRouter, openPage } from '../index.js'

interface Routes {
  home: void
  create: 'type' | 'mode'
  post: 'id'
  exit: void
}

let router = createRouter<Routes>({
  home: '/',
  // THROWS "type" | "mode"
  create: [/\/post\/(new|draft)/, type => ({ mode: 'editor' })],
  post: '/post/:id',
  exit: '/exit'
})

router.subscribe(page => {
  if (!page) {
    console.log('404')
  } else if (page.route === 'post') {
    // THROWS 'type' does not exist on type 'Params<"id">'
    router.open(`/post/${page.params.type}`)
  // THROWS This condition will always return 'false' since the types '"home" | "create" | "exit"' and '"creat"' have no overlap.
  } else if (page.route === 'creat') {
    console.log('create')
  }
})

router.subscribe(page => {
  // THROWS Object is possibly 'undefined'
  console.log(page.route)
})

// THROWS category: string; }' is not assignable to parameter
openPage(router, 'post', { id: '1', category: 'guides' })
// THROWS Expected 2 arguments, but got 3
openPage(router, 'home', { id: '1' })
