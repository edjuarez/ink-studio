export type NavItem = {
  name: string;
  href: string;
};

export type GalleryItem = {
  id: number;
  image: string;
  title?: string;
  category?: string;
  style?: string;
};

export type AboutParagraph = {
  lead: string;
  highlights: string[];
  tail: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SocialImage = {
  src: string;
  alt: string;
};

type FooterLink = {
  name: string;
  href: string;
};

export type ContentData = {
  site: {
    name: string;
    tagline: string;
    fullName: string;
  };
  userData: {
    phone: string;
    phoneRaw: string;
    whatsappUrl: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    location: string;
    schedule: {
      days: string;
      hours: string;
    };
  };
  buttons: {
    bookAppointment: string;
    seeWork: string;
    seeDesigns: string;
    seePrints: string;
    followInstagram: string;
    whatsapp: string;
    instagram: string;
    send: string;
    sending: string;
    openMenu: string;
    closeMenu: string;
    goNextSection: string;
    contactWhatsapp: string;
    whatsappCta: string;
  };
  common: {
    allCategories: string;
    imageAlt: (id: number) => string;
    printAlt: (n: number) => string;
  };
  navigation: NavItem[];
  sections: {
    hero: {
      title: string;
      subtitle: string;
      backgroundAlt: string;
    };
    estilos: {
      eyebrow: string;
      title: string;
      paragraph: string;
      styles: string[];
      separators: string[];
    };
    about: {
      eyebrow: string;
      title: string;
      tagline: string;
      paragraphs: AboutParagraph[];
      portraitAlt: string;
    };
    homeGallery: {
      eyebrow: string;
      title: string;
      works: GalleryItem[];
    };
    designsSection: {
      eyebrow: string;
      title: string;
      description: string;
      images: string[];
    };
    printsSection: {
      eyebrow: string;
      title: string;
      description: string;
      images: string[];
    };
    social: {
      eyebrow: string;
      description: string;
      images: SocialImage[];
    };
    contact: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      description: string;
      details: {
        phone: string;
        instagram: string;
        location: string;
      };
    };
    booking: {
      eyebrow: string;
      title: string;
      description: string;
      microcopy: string;
    };
    faq: {
      eyebrow: string;
      title: string;
      items: FaqItem[];
    };
    footer: {
      description: string;
      navTitle: string;
      policiesTitle: string;
      infoTitle: string;
      policies: FooterLink[];
      copyright: (year: number) => string;
      credit: string;
    };
  };
  pages: {
    prints: {
      title: string;
      description: string;
      items: GalleryItem[];
    };
    portfolio: {
      title: string;
      items: GalleryItem[];
    };
    designs: {
      title: string;
      description: string;
      items: GalleryItem[];
    };
    contact: {
      title: string;
      description: string;
    };
  };
  form: {
    fields: {
      name: {
        label: string;
        placeholder: string;
        required: string;
      };
      email: {
        label: string;
        placeholder: string;
        required: string;
        invalid: string;
      };
      phone: {
        label: string;
        placeholder: string;
      };
      idea: {
        label: string;
        placeholder: string;
        required: string;
      };
      placement: {
        label: string;
        placeholder: string;
      };
      size: {
        label: string;
        placeholder: string;
      };
      style: {
        label: string;
      };
      budget: {
        label: string;
      };
      references: {
        title: string;
        addText: string;
        helper: string;
      };
    };
    options: {
      style: SelectOption[];
      budget: SelectOption[];
    };
    helperText: string;
  };
};
