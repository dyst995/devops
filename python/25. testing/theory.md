# Testing

## Turn out Python script to the maintainable application

## Maintainability

The software has become an essential part of the world we live in. It has outgrown its early sole purpose of making businesses more efficient. Today companies try to find ways to become **first-class digital companies**. As users, every one of us interacts with an ever-increasing amount of software every day. The wheels of innovation are turning **faster**.

If you want to keep pace you'll have to look into ways to **deliver your software faster** without sacrificing its **quality**. **Continuous delivery**, a practice where you automatically ensure that your software can be **released into production at any time**, can help you with that. With continuous delivery, you use a **build pipeline** to automatically **test** your software and **deploy** it to your testing and production environments.

Building, testing, and deploying an ever-increasing amount of software **manually** soon becomes **impossible** — unless you want to spend all your time with manual, repetitive work instead of delivering working software. **Automating everything** — from **build** to **tests**, **deployment**, and **infrastructure** — is your only way forward.

Traditionally software testing was overly **manual** work done by deploying your application to a **test environment** and then performing some **black-box** style testing e.g. by **clicking through your user interface** to see if anything's broken. Often these tests would be specified by **test scripts** to ensure the testers would do **consistent** checking.

It's obvious that testing all changes **manually** is **time-consuming**, **repetitive**, and **tedious**. Repetitive is **boring**, boring leads to **mistakes** and makes you look for a different job by the end of the week.

Luckily there's a remedy for repetitive tasks: **automation**.

Automating your repetitive tests can be a big game changer in your life as a software developer. Automate these tests and you no longer have to mindlessly follow **click protocols** in order to check if your software still works correctly. Automate your tests and you can **change your codebase without batting an eye**. If you've ever tried doing a **large-scale refactoring** without a proper **test suite** I bet you know what a terrifying experience this can be. How would you know if you accidentally **broke stuff** along the way? Well, you click through all your manual test cases, that's how. But let's be honest: do you really enjoy that? How about making even large-scale changes and knowing whether you broke stuff **within seconds** while taking a nice sip of coffee?

**Memory hook:** script → maintainable app = **automate** build, tests, deploy, infra. **CD** = releasable **any time** via a **pipeline**. Manual click scripts = slow, boring, mistakes.

| Old way | Course fix |
| --- | --- |
| Manual deploy + black-box UI clicks | Automated tests in a pipeline |
| Test scripts for consistent clicking | Automate the repetitive checks |
| Fear of large refactors | Test suite → know in **seconds** |

## Quality gates

The **standard CI/CD pipeline** for a Python application (course slide: **Quality gates**).

A **quality gate** is a **checkpoint** in the pipeline: the change **does not proceed** (to the next stage / to production) unless the automated checks **pass**.

Typical Python CI/CD idea from the notes: pipeline **tests** the software and **deploys** to testing and production — only after gates succeed.

**Memory hook:** gate = **stop if red**. No “deploy anyway.”

## Test Pyramid

Course slide: **Test Pyramid**.

Many **fast, cheap** tests at the **base** (unit / close to the code). Fewer **slower, broader** tests in the **middle** (integration / API). Fewest **slow UI / end-to-end** tests at the **top**. Do not invert the pyramid (only UI clicks, no unit suite).

**Memory hook:** **wide base** (lots of unit) · **narrow top** (few UI). Matches “seconds + coffee,” not only black-box clicking.

```text
        /  UI / e2e   \     few, slow
       /  integration  \
      /____ unit ______\    many, fast
```

How to write those unit tests: [unit testing](../26. unit-testing/theory.md).

## Code quality tools for Python

Course slide: **Code quality tools**.

These sit in the same pipeline as tests: they **fail the gate** if style, types, or complexity rules break — not only if a functional test fails.

## Additional tools

Course slide: **Additional tools**.

More automation around the same goal (maintainable Python, not a one-off script). Course figures name the tools; recite the **idea**: quality is **automated** in CI, not a manual review-only step.

**Memory hook:** functional tests **and** quality tools = gates. Additional tools = more of the same pipeline, not a separate manual job.
