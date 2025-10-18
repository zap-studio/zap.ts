import { createFakeORPCClients } from "@zap/rpc/orpc/fake";
import { $pwa } from "../rpc/procedures";

const fakeVapidConfigs = {
  publicKey: "FAKE_VAPID_PUBLIC_KEY",
  privateKey: "FAKE_VAPID_PRIVATE_KEY",
  mail: "fake@mail.com",
};

const fakeRouter = {
  pwa: $pwa(fakeVapidConfigs),
};

const { orpcClient, orpcReactQuery } =
  createFakeORPCClients<typeof fakeRouter>();

export type PwaOrpcClient = typeof orpcClient.pwa;
export type PwaOrpcReactQuery = typeof orpcReactQuery.pwa;
