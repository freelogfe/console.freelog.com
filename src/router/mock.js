/**
 * mock 池
 */
import Views from '@/views'
import i18n from '../lib/i18n'

export default {
    name: 'mock',
    path: 'mock',
    meta: {
        requiresAuth: true,
        title: i18n.t('routes.resourceSystem')
    },
    component: Views.container,
    redirect: '/mock/list',
    children: [
        {
            path: 'list',
            meta: {
                requiresAuth: true,
                // title: i18n.t('routes.resourcePolicyTplList'),
                title: i18n.t('routes.resourcePolicyTplList'),
                type: 'resource'
            },
            component: Views.mockList
        },
        {
            path: 'create',
            hidden: true,
            meta: {
                requiresAuth: true,
                title: i18n.t('routes.createResource'),
                type: 'resource',
                theme: 'gray'
            },
            component: Views.resourceCreator,
        },
        {
            path: 'edit/:resourceId',
            hidden: true,
            meta: {
                requiresAuth: true,
                title: i18n.t('routes.updateResource'),
                type: 'resource',
                theme: 'gray',
                // hideSidebar: true
            },
            component: Views.resourceEditor,
        },
        {
            path: 'list',
            meta: {
                requiresAuth: true,
                title: i18n.t('routes.myResources'),
                type: 'resource'
            },
            component: Views.resourceList
        },
        {
            path: 'detail',
            hidden: true,
            redirect: '/resource/list',
        },
        {
            path: 'detail/:resourceId',
            hidden: true,
            meta: {
                requiresAuth: true,
                title: i18n.t('routes.resourceDetail'),
                type: 'resource',
                theme: 'gray'
            },
            component: Views.resourceDetail
        },
        {
            path: 'policy_tpl',
            hidden: true,
            meta: {
                requiresAuth: true,
                type: 'resource'
            },
            component: Views.container,
            redirect: '/resource/policy_tpl/list',
            children: [
                {
                    path: 'create',
                    hidden: true,
                    meta: {
                        requiresAuth: true,
                        title: i18n.t('routes.createResourcePolicyTpl'),
                        type: 'resource'
                    },
                    component: Views.policyTplCreator
                },
                {
                    path: 'detail',
                    hidden: true,
                    meta: {
                        requiresAuth: true,
                        title: i18n.t('routes.resourcePolicyTplDetail'),
                        type: 'resource'
                    },
                    component: Views.policyTplDetail
                }
            ]
        }
    ]
}
