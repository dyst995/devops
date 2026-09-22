# Testing — Questions

Cover the Answers section. Answer first, then check.

1. Why deliver faster *and* keep quality? What is continuous delivery? What does the build pipeline do?
2. What must you automate (four items)? Why is manual build/test/deploy impossible at scale?
3. Traditional testing: where, style, example, why test scripts?
4. Why is manual testing a problem (time, repetitive, tedious → boring → ?)? Remedy?
5. What do automated tests replace (click protocols)? Refactoring without a suite? With a suite (seconds / coffee)?
6. What is a quality gate? Standard pipeline slide name?
7. Test pyramid: base vs middle vs top? What is an inverted pyramid?
8. Code quality tools vs additional tools — what job in the pipeline?

---

## Answers

1. Keep pace; quality stays. Software **releasable to production at any time**. Automatically **test** and **deploy** to test and production.
2. Build, tests, deployment, infrastructure. Manual repetitive work instead of delivering software.
3. Deploy to a test environment; **black-box**; click the UI to see if anything’s broken; scripts so testers check **consistently**.
4. Time-consuming, repetitive, tedious. Boring → mistakes (and you want another job). **Automation**.
5. Mindless click protocols. Terrifying — you only know by clicking everything. Large changes, know in **seconds**, coffee.
6. Checkpoint: fail → do not proceed. **Quality gates** (standard Python CI/CD).
7. Many unit (fast) · fewer integration · few UI/e2e (slow). Only UI, almost no unit tests.
8. Automated checks besides “did the feature work” (style/quality). More tools, same idea — automate, don’t only click.
