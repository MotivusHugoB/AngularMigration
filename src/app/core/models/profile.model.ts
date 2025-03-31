export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ProfileResponse {
  profile: Profile;
}

/**
 * Profile model class
 * 
 * This model represents a user profile in the application.
 * It contains basic information about a user that can be viewed publicly.
 */
export class ProfileModel implements Profile {
  username: string = '';
  bio: string = '';
  image: string = '';
  following: boolean = false;

  /**
   * Creates a new Profile instance from API data
   * 
   * @param data Raw profile data from API
   * @returns A new Profile instance
   */
  static fromJSON(data: Profile): ProfileModel {
    const profile = new ProfileModel();
    profile.username = data.username;
    profile.bio = data.bio || '';
    profile.image = data.image || '';
    profile.following = data.following || false;
    return profile;
  }

  /**
   * Converts the profile to a plain object
   * 
   * @returns A plain JavaScript object representing this profile
   */
  toJSON(): Profile {
    return {
      username: this.username,
      bio: this.bio,
      image: this.image,
      following: this.following
    };
  }
}