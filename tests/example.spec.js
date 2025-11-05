const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    //전체 화면에 대한 role을 Console에서 확인할 수 있다.
    const snapshot = await page.accessibility.snapshot();
    console.log(JSON.stringify(snapshot, null, 2));

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
test('pnpm 버튼 클릭 후 "pnpm create playwright" 문구가 노출되는지 확인', async ({ page }) => {
  // 1️⃣ Playwright 홈페이지 접속
  await page.goto('https://playwright.dev');

  // 2️⃣ "Get Started" 페이지로 이동 (설치 명령어가 있는 곳)
  await page.getByRole('link', { name: 'Get started' }).click();

  // 3️⃣ "pnpm" 버튼 클릭
  const pnpmButton = page.getByRole('tab', { name: 'pnpm' }).first();
  await pnpmButton.click();

  // 4️⃣ "pnpm create playwright" 문구가 노출되는지 확인
  const commandLocator = page.getByText('pnpm create playwright', { exact: false });
  await expect(commandLocator).toBeVisible();
});

test('Search for Playwright testing', async ({ page }) => {
    // 1️⃣ Playwright 홈페이지 접속
    await page.goto('https://playwright.dev');
   
    // 2️⃣ 검색 아이콘 클릭
    await page.getByRole('button', { name: /search/i }).click();

    // 팝업 열람 확인
    const search = page.getByRole('searchbox', { name: /search/i });
    await expect(search).toBeVisible();
    
    // 3️⃣ 검색어 입력

    await search.fill('example');

    // 4️⃣ 검색 결과에서
    const dropdown = page.locator('.DocSearch-Dropdown-Container');
    await expect(dropdown).toBeVisible();

    // (선택) 결과 항목(option)도 최소 1개 보이는지
    await expect(dropdown.getByRole('option').first()).toBeVisible();
    // 5️⃣ 결과 아이템이 최소 1개 이상이고, "Example" 텍스트가 포함되어 있는지 확인
    await expect(dropdown).toContainText('Example');
    // 첫번째 결과 선택
    const firstResult = dropdown.getByRole('option').first();
    await firstResult.click();

    // 6️⃣ Example 페이지로 이동 확인
    await expect(page).toHaveURL(/.*example/);
    await expect(page.getByRole('heading', { name: 'Example' })).toBeVisible();
});