/**
 * "Make this my site" on /try: what the demo running in the visitor's browser holds, read out of its WordPress in the
 * shape the API's demo drafts take (POST /demos/drafts): pages, Site Editor styles, a changed header and footer, menus
 * and the business details. Never plugins, code, users or settings. Photos from the media library become
 * `anypress-demo-image:<name>` and are listed with their file, so the page can send them to their upload links; the
 * rest of the demo's own address becomes a relative link, so theme images and page links work on the new store.
 */

export interface DemoImage {
  name: string;
  path: string;
}

export interface DemoExport {
  content: {
    pages: { title: string; slug: string; content: string; status: "publish" | "draft" }[];
    styles?: { settings?: object; styles?: object };
    header?: string;
    footer?: string;
    menus?: { title: string; content: string }[];
    business?: Record<string, string>;
  };
  images: DemoImage[];
}

/** Runs inside the demo's WordPress (Playground's run()); prints the DemoExport as JSON. */
export const DEMO_EXPORT_PHP = String.raw`<?php
require '/wordpress/wp-load.php';

$home = untrailingslashit(home_url());
$uploads = wp_upload_dir();
$images = [];
$names = [];
$photo = function (string $url) use ($uploads, &$images, &$names): ?string {
    if (strpos($url, $uploads['baseurl'] . '/') !== 0) {
        return null;
    }
    if (isset($images[$url])) {
        return 'anypress-demo-image:' . $images[$url]['name'];
    }
    $path = $uploads['basedir'] . substr($url, strlen($uploads['baseurl']));
    $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    if (count($images) >= 20 || !in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif'], true) || !is_file($path) || filesize($path) > 4 * 1024 * 1024) {
        return null;
    }
    $base = substr(trim((string) preg_replace('/[^a-z0-9._-]+/', '-', strtolower(pathinfo($path, PATHINFO_FILENAME))), '-._'), 0, 60) ?: 'photo';
    $name = $base . '.' . $ext;
    for ($i = 2; isset($names[$name]); $i++) {
        $name = $base . '-' . $i . '.' . $ext;
    }
    $names[$name] = true;
    $images[$url] = ['name' => $name, 'path' => $path];
    return 'anypress-demo-image:' . $name;
};
$clean = function (string $blocks) use ($home, $photo): string {
    $blocks = (string) preg_replace_callback('#https?://[^\s"\'<>()\\\\]+#', function ($m) use ($photo) {
        return $photo($m[0]) ?? $m[0];
    }, $blocks);
    // Theme images, page links: the same paths on the new store.
    return str_replace([$home . '/', str_replace('/', '\/', $home) . '\/'], ['/', '\/'], $blocks);
};

$pages = [];
foreach (get_posts(['post_type' => 'page', 'post_status' => ['publish', 'draft'], 'numberposts' => 30, 'orderby' => 'menu_order title', 'order' => 'ASC']) as $page) {
    if (!preg_match('/^[a-z0-9][a-z0-9-]{0,199}$/', $page->post_name)) {
        continue;
    }
    $pages[] = [
        'title' => mb_substr(get_the_title($page) ?: $page->post_name, 0, 200),
        'slug' => $page->post_name,
        'content' => $clean($page->post_content),
        'status' => $page->post_status === 'draft' ? 'draft' : 'publish',
    ];
}
$content = ['pages' => $pages];

$styles_id = WP_Theme_JSON_Resolver::get_user_global_styles_post_id();
$user = json_decode((string) get_post_field('post_content', $styles_id), true) ?: [];
$styles = array_filter(['settings' => $user['settings'] ?? null, 'styles' => $user['styles'] ?? null]);
if ($styles) {
    $content['styles'] = json_decode($clean((string) wp_json_encode($styles)), true);
}

foreach (['header', 'footer'] as $area) {
    $part = get_block_template(get_stylesheet() . '//' . $area, 'wp_template_part');
    if ($part && $part->wp_id && trim((string) $part->content) !== '') {
        $content[$area] = $clean((string) $part->content);
    }
}

$menus = [];
foreach (get_posts(['post_type' => 'wp_navigation', 'post_status' => 'publish', 'numberposts' => 5]) as $menu) {
    if (trim($menu->post_title) !== '' && trim($menu->post_content) !== '') {
        $menus[] = ['title' => mb_substr($menu->post_title, 0, 200), 'content' => $clean($menu->post_content)];
    }
}
if ($menus) {
    $content['menus'] = $menus;
}

$business = array_filter(array_map('strval', (array) get_option('anypress_business_profile', [])), 'strlen');
$business = array_intersect_key($business, array_flip(['what', 'who', 'area', 'hours', 'contact', 'voice', 'notes']));
if ($business) {
    $content['business'] = $business;
}

echo wp_json_encode(['content' => $content, 'images' => array_values($images)]);
`;
