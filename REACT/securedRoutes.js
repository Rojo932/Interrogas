import { lazy } from 'react';

import ReferenceForm from '../components/references/ReferenceForm';
import ReferenceUpdate from '../components/references/ReferenceUpdate';
const Blogs = lazy(() => import('../components/blogs/Blog'));
const Parties = lazy(() => import('../pages/parties/Parties'));
const Pollsters = lazy(() => import('../components/pollsters/Pollsters'));
const PollstersExportToCSV = lazy(() => import('../components/pollsters/PollstersExportToCSV'));
const AnalyticsDashboards = lazy(() => import('../pages/dashboard/analytics/index.js'));
const CampaignDashboard = lazy(() => import('../pages/dashboard/campaign/CampaignDashboard'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const References = lazy(() => import('../components/references/References'));
const BaseTemplate = lazy(() => import('../components/newslettertemplate/form/BaseTemplate'));
const EditUserProfile = lazy(() => import('../components/account/EditUserProfile'));
const SurveyForm = lazy(() => import('../pages/survey/forms/SurveyForm'));
const SurveyBuilder = lazy(() => import('../pages/survey/components/SurveyBuilder'));
const addSurveyQuestionForm = lazy(() => import('../pages/survey/forms/AddSurveyQuestion'));
const Candidates = lazy(() => import('../pages/candidates/Candidates.jsx'));
const NewCandidate = lazy(() => import('../pages/candidates/NewCandidate'));
const NewsletterSubscription = lazy(() => import('../components/newslettersubscription/NewsletterSubscription'));
const WebScraper = lazy(() => import('../pages/webscraper/components/WebScraper.jsx'));
const BlogsForm = lazy(() => import('../components/blogs/BlogsForm'));
const AnswerPreview = lazy(() => import('../pages/survey/forms/AnswerPreview'));
const FileManager = lazy(() => import('../pages/filemanager/FileManager'));
const Polls = lazy(() => import('../components/polls/PollsPage'));
const Unsubscribe = lazy(() => import('../components/newsletters/unsubscribe/Unsubscribe'));
const Newsletter = lazy(() => import('../components/newsletters/Newsletter'));
const Election = lazy(() => import('../components/elections/Election'));
const ElectionForm = lazy(() => import('../components/elections/ElectionForm'));
const SurveyInstances = lazy(() => import('../pages/survey/components/surveysinstances/SurveyInstance'));
const SelectedSurvey = lazy(() => import('../pages/survey/components/surveysinstances/SelectedSurvey'));
const SurveyChart = lazy(() => import('../pages/survey/components/surveysinstances/SurveyChart'));
const Locations = lazy(() => import('../pages/dashboard/locations/Locations'));
const FaqQuestionInsertForm = lazy(() => import('../components/faq/FaqQuestionInsertForm'));
const FaqQuestionUpdateForm = lazy(() => import('../components/faq/FaqQuestionUpdateForm'));
const Checkout = lazy(() => import('../components/checkout/Checkout'));
const AddSQAO = lazy(() => import('../pages/survey/forms/AddSQAO'));
const TemplateOne = lazy(() => import('../components/newslettertemplate/templates/TemplateOne'));

const Confirm = lazy(() => import('../components/newsletters/unsubscribe/Confirm'))
const dashboardRoutes = [
    {
        path: '/dashboard/analytics',
        name: 'Analytics',
        element: AnalyticsDashboards,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },

    {
        path: '/dashboard/campaign',
        name: 'Campaign',
        element: CampaignDashboard,
        exact: true,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/dashboard',
        name: 'Dashboards',
        icon: 'uil-home-alt',
        header: 'Navigation',
        children: [
            {
                path: '/dashboard/analytics',
                name: 'Analytics',
                element: AnalyticsDashboards,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
    {
        path: '/dashboard',
        name: 'Dashboards',
        icon: 'uil-home-alt',
        header: 'Navigation',
        children: [
            {
                path: '/dashboard/campaign',
                name: 'CampaignDashboard',
                element: CampaignDashboard,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const parties = [
    {
        path: '/parties',
        name: 'Parties',
        exact: true,
        element: Parties,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
];

const candidates = [
    {
        path: '/candidates',
        name: 'Candidates',
        exact: true,
        element: Candidates,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/candidates/new',
        name: 'NewCan',
        exact: true,
        element: NewCandidate,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/candidates/update',
        name: 'NewCan',
        exact: true,
        element: NewCandidate,
        roles: ['Admin'],
        isAnonymous: false,
    },
];
const fileManager = [
    {
        path: '/filemanager',
        name: 'FileManager',
        exact: true,
        element: FileManager,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const locations = [
    {
        path: '/locations',
        name: 'Locations',
        element: Locations,
        roles: ['Admin', 'User'],
        exact: true,
        isAnonymous: false,
    },
];

const test = [
    {
        path: '/test',
        name: 'Test',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
    },
    {
        path: '/secured',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
    },
    {
        path: '/secured2',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const pollsters = [
    {
        path: '/pollsters',
        name: 'Pollsters',
        exact: true,
        element: Pollsters,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },

    {
        path: '/components/pollsters/export',
        name: 'PollstersExportToCSV',
        exact: true,
        element: PollstersExportToCSV,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
];

const surveys = [
    {
        path: '/surveys/new',
        name: 'Surveys',
        exact: true,
        element: SurveyForm,
        roles: ['Admin', 'Surveyor'],
        isAnonymous: false,
        children: [
            {
                path: '/surveys/:id',
                name: 'Surveys',
                exact: true,
                element: SurveyForm,
                roles: ['Admin', 'Surveyor'],
                isAnonymous: false,
            },
        ],
    },

    {
        path: '/surveys/design/:id',
        name: 'Surveys',
        exact: true,
        element: SurveyBuilder,
        roles: ['Admin', 'Surveyor'],
        isAnonymous: false,
        children: [
            {
                path: '/surveys/questions',
                name: 'SurveyQuestions',
                exact: true,
                element: addSurveyQuestionForm,
                roles: ['Admin', 'Surveyor'],
                isAnonymous: false,
                children: [
                    {
                        path: '/surveys/questions/answers/options',
                        name: 'SQAO',
                        exact: true,
                        element: AddSQAO,
                        roles: ['Admin', 'Surveyor'],
                        isAnonymous: false,
                    },
                ],
            },
            {
                path: '/surveys/answers',
                name: 'preview',
                exact: true,
                element: AnswerPreview,
                roles: ['Admin'],
                isAnonymous: false,
            },
        ],
    },
    {
        path: '/surveys/results',
        name: 'Surveys',
        exact: true,
        element: SurveyInstances,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/surveys/selected',
        name: 'SelectedSurvey',
        exact: true,
        element: SelectedSurvey,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/surveys/chart',
        name: 'SurveyChart',
        exact: true,
        element: SurveyChart,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
];

const blogs = [
    {
        path: '/admin/blogs/new',
        name: 'BlogsForm',
        exact: true,
        element: BlogsForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/admin/blogs/:id/edit',
        name: 'BlogsForm',
        exact: true,
        element: BlogsForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/admin/blogs',
        name: 'Blogs',
        exact: true,
        element: Blogs,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const election = [
    {
        path: '/elections',
        name: 'Election',
        exact: true,
        element: Election,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/elections/new',
        name: 'ElectionForm',
        exact: true,
        element: ElectionForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const errorRoutes = [
    {
        path: '*',
        name: 'Error - 404',
        element: PageNotFound,
        roles: [],
        exact: true,
        isAnonymous: false,
    },
];

const newsletter = [
    {
        path: '/newsletter',
        name: 'Newsletter',
        exact: true,
        element: Newsletter,
        roles: ['Admin'],
        isAnonymous: false,
        children: [
            {
                path: '/newsletter/template',
                name: 'NewsletterTemplate',
                exact: true,
                element: BaseTemplate,
                roles: ['Admin'],
                isAnonymous: false,
            },
            {
                path: 'newsletter/:id',
                name: 'templateone',
                exact: true,
                element: TemplateOne,
                roles: ['Admin'],
                isAnonymous: false,
            },
        ],
    },
];

const userProfile = [
    {
        path: '/profile/edit',
        name: 'EditUserProfile',
        exact: true,
        element: EditUserProfile,
        roles: ['Admin', 'Campaign', 'Surveyor', 'User'],
    },
];

const newsletterSubscription = [
    {
        path: '/newsletters/subscriptions',
        name: 'Subscribe',
        element: NewsletterSubscription,
        roles: [],
        exact: true,
        isAnonymous: false,
    },
];

const webScraper = [
    {
        path: '/tools/webscraper',
        name: 'WebScraper',
        element: WebScraper,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },
];

const unsubscribe = [
    {
        path: '/unsubscribe',
        name: 'Unsubscribe',
        exact: true,
        element: Unsubscribe,
        roles: ['User'],
        isAnonymous: false,
    },
    {
        path:'/unsubscribe/confirm',
        name:'Confirm',
        exact:true,
        element:Confirm,
        roles: ['User'],
        isAnonymous: false,
    },
];

const polls = [
    {
        path: '/polls',
        name: 'PollsPage',
        exact: true,
        element: Polls,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const references = [
    {
        path: '/references',
        name: 'References',
        exact: true,
        element: References,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/references/new',
        name: 'ReferenceForm',
        exact: true,
        element: ReferenceForm,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/references/update/:id',
        name: 'ReferenceUpdate',
        exact: true,
        element: ReferenceUpdate,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
];

const faqs = [
    {
        path: '/faqs/new',
        name: 'FaqQuestionForm',
        exact: true,
        element: FaqQuestionInsertForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/faqs/update',
        name: 'FaqQuestionForm',
        exact: true,
        element: FaqQuestionUpdateForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const checkout = [
    {
        path: '/checkout',
        name: 'Checkout',
        exact: true,
        element: Checkout,
        roles: [],
        isAnonymous: false,
    },
];

const allRoutes = [
    ...newsletterSubscription,
    ...dashboardRoutes,
    ...test,
    ...errorRoutes,
    ...surveys,
    ...candidates,
    ...parties,
    ...polls,
    ...pollsters,
    ...userProfile,
    ...webScraper,
    ...blogs,
    ...newsletter,
    ...fileManager,
    ...unsubscribe,
    ...references,
    ...locations,
    ...checkout,
    ...faqs,
    ...checkout,
    ...election,
];

export default allRoutes;
