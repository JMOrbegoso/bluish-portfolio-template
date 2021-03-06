import Avatar from './avatar';
import CoverImage from './cover-image';
import PageHeader from './page-header';
import Author from '../types/author';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  content: string;
  author: Author;
};

const ProjectHeader = ({ title, coverImage, date, content, author }: Props) => {
  return (
    <>
      <PageHeader>{title}</PageHeader>
      <div className="hidden md:block md:mb-12">
        <Avatar
          name={`${author.firstname} ${author.lastname}`}
          picture={author.picture}
          web={author.web}
        />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar
            name={`${author.firstname} ${author.lastname}`}
            picture={author.picture}
            web={author.web}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectHeader;
