export interface CategoryTagsProps { 
    categories: string [] | { name: string } []; 
    handleCategoryClick: (category: string) => void;
    isActive: (category: string) => boolean;
};

export interface Source {
    id: number;
    likes: string[];
    text: string;
    source: string;
    category?: string; 
};

export type LearningSourcesProps = {
    sources: Source[];
};

export interface TitleProps {
    title: string
    description: string;
};

export interface CategoryProps {
    name: string;
};

export interface CategoryFilterProps {
    setCurrentCategory: (category: string) => void; 
    currentCategory: string;
};

export interface Fact {
    id: number;
    likes: string[];
    text: string;
    source: string;
    category?: string;  
  };

export interface FreeSourcesListProps {
  facts: Fact[];
}

export interface FreeSourceProps {
  fact: Fact;
}