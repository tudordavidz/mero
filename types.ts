// Types for Profile and Reviews
export type ProfileImage = {
  _id: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
};

export type PageLocation = {
  city: string;
  address: string;
  long: number;
  lat: number;
  extraInfo?: string;
  district?: string;
  area?: string;
};

export type PageImage = {
  _id: string;
  croppedSmall: string;
  croppedLarge: string;
  small: string;
  medium: string;
  large: string;
};

export type Feedback = {
  score: number;
  total: number;
};

export type PageProfile = {
  _id: string;
  slug: string;
  name: string;
  phoneNo: string;
  location: PageLocation;
  description: string;
  profilePhoto: ProfileImage;
  images: PageImage[];
  feedback: Feedback;
  hideReviews?: boolean;
};

// Review types
export type AnonymousFeedbackDetails = {
  _id: string;
  isAnonymous: true;
  feedback: {
    score: number;
    review?: string;
  };
};

export type VisibleFeedbackDetails = {
  _id: string;
  isAnonymous?: false;
  user: {
    firstname?: string;
    lastname?: string;
    profilePhoto?: ProfileImage;
  };
  feedback: {
    score: number;
    review?: string;
  };
};

export type PublicFeedbackDetails =
  | AnonymousFeedbackDetails
  | VisibleFeedbackDetails;

export type PageReviews = {
  data: PublicFeedbackDetails[];
  next?: string;
};
