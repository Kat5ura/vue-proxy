import Options from './options.vue'
import OptionsOther from './options-other.vue'
import Responder from './responder/index.vue'
import Host from './host/index.vue'
import Willow from './willow/index.vue'

const routes = [
  {
    index: '1',
    name: '配置项',
    icon: 'menu',
    items: [
      {
        index: '1-1',
        name: 'Responder',
        component: Responder
      },
      {
        index: '1-2',
        name: 'Hosts',
        component: Host
      },
      {
        index: '1-3',
        name: 'Willow',
        component: Willow
      }
    ],
  },
  {
    index: '2',
    name: '配置项2',
    icon: 'setting',
    component: OptionsOther
  },
  {
    index: '1',
    name: '配置项3',
    icon: 'menu',
    items: [
      {
        index: '3-1',
        name: '选项1',
        component: Options
      },

      {
        group: true,
        name: '分组1',
        items: [
          {
            index: '3-2',
            name: '选项2',
            component: Options
          },
          {
            index: '3-3',
            name: '选项3',
            component: Options
          },
        ]
      }

    ],
  },
]

export default routes
