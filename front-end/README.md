# Digi Gogo - Front-end

This is the front-end of the Digi Gogo project. It is a Next.js application that uses TypeScript and html `canvas` to render the digital circuit simulator. It allows users to visually design digital circuits and simulate their behavior.

## Architecture

Let's summarize the components architecture and the relationships between them:

```mermaid
---
title: Architecture
---
flowchart TD
  layout
  page
  header["Header"]
  canvas["Canvas"]
  grid["Grid"]
  cmdpanel["Command Panel"]
  btn["Button"]
  btngroup["Button Group"]
  gate["Logic Gate"]
  separator["Separator"]
  wire["Wire"]

  layout --> page

  page --> header
  page --> canvas
  page --> cmdpanel

  canvas --> grid
  canvas --> gate
  canvas --> wire

  cmdpanel --> btn
  cmdpanel --> btngroup
  cmdpanel --> separator

  btngroup --> btn
  btngroup --> gate
  btngroup --> separator

```
