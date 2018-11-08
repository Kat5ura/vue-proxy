import Options from './options.vue'
import OptionsOther from './options-other.vue'
import Responder from './responder.vue'
import Host from './host.vue'

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
        group: true,
        name: '分组2',
        items: [
          {
            index: '1-4',
            name: '选项4',
            component: Options
          },
          {
            index: '1-5',
            name: '选项5',
            component: Options
          },
        ]
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
