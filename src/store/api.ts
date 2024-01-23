import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

const BASE_URL = 'https://mocki.io/v1';

class Api {
  async fetchContatcs(): Promise<ContactDto[]> {
    const response = await fetch(
      `${BASE_URL}/28d70659-c0aa-4b9c-ba07-da5923a0f8bd`
    );
    const data = await response.json();

    return data;
  }

  async fetchGroups(): Promise<GroupContactsDto[]> {
    const response = await fetch(
      `${BASE_URL}/b1530e5d-6c52-4f52-bd70-c36510854ab3`
    );
    const data = await response.json();

    return data;
  }
}

export const api = new Api();
