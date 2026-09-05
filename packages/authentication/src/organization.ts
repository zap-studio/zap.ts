import { clerkClient } from "@clerk/tanstack-react-start/server";

export const getOrganizationAdminEmails = async (organizationId: string): Promise<string[]> => {
  const client = clerkClient();
  const { data: memberships } = await client.organizations.getOrganizationMembershipList({
    organizationId,
    limit: 100,
  });

  const adminUserIds: string[] = [];
  for (const membership of memberships) {
    if (membership.role === "org:admin" && membership.publicUserData?.userId) {
      adminUserIds.push(membership.publicUserData.userId);
    }
  }

  const users = await Promise.all(adminUserIds.map((userId) => client.users.getUser(userId)));

  return users
    .map((user) => user.emailAddresses[0]?.emailAddress)
    .filter((email): email is string => email !== undefined);
};
