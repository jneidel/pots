#! /usr/bin/env node

import { setupDatabase } from "./config/database";

( async () => {
  await setupDatabase();
} )();
