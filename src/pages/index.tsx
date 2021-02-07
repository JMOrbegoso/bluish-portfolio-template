import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ProjectsList from '../components/projects-list';
import Layout from '../components/layout';
import { getAuthorData, getAllProjectsPreviews } from '../lib/api';
import Head from 'next/head';
import { URL_BASE, WEB_NAME, WEB_DESCRIPTION } from '../lib/constants';
import Project from '../types/project';
import Author from '../types/author';
import generateRssFeed from '../../scripts/generate-rss-feed';
import generateSitemap from '../../scripts/generate-sitemap';
import generateFavicons from '../../scripts/generate-favicons';
import generateBlogCache from '../../scripts/generate-blog-cache';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  author: Author;
  projects: Project[];
};

const Index = ({ author, projects }: Props) => {
  const { t, lang } = useTranslation('common');

  return (
    <>
      <Layout author={author}>
        <Head>
          <title> {WEB_NAME} </title>

          <meta property="description" content={WEB_DESCRIPTION} />
          <meta
            property="author"
            content={`${author.firstname} ${author.lastname}`}
          />
          <meta name="keywords" content={'development'} />
          <meta name="date" content={new Date().toLocaleDateString()} />

          <meta property="og:url" content={`${URL_BASE}`} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={WEB_NAME} />
          <meta property="og:description" content={WEB_DESCRIPTION} />
          <meta property="og:image" content={author.picture} />
        </Head>
        <ProjectsList projects={projects} />
      </Layout>
    </>
  );
};

export default Index;

type Params = {
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ locale }: Params) => {
  // Run one-time scripts
  await generateRssFeed();
  await generateSitemap();
  await generateFavicons();
  await generateBlogCache();

  const author = getAuthorData(locale);
  const projects = getAllProjectsPreviews(locale);

  return {
    props: {
      author,
      projects,
    },
  };
};
