<?php
// Set CORS headers to allow local/cross-origin requests if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Ensure comments folder exists
$comments_dir = __DIR__ . '/comments';
if (!file_exists($comments_dir)) {
    mkdir($comments_dir, 0755, true);
}

$method = $_SERVER['REQUEST_METHOD'];

// 1. GET requests to fetch comments for a specific post slug
if ($method === 'GET') {
    $slug = isset($_GET['slug']) ? basename($_GET['slug']) : '';
    if (!$slug) {
        echo json_encode([]);
        exit;
    }
    
    $file_path = $comments_dir . '/' . $slug . '.json';
    if (file_exists($file_path)) {
        echo file_get_contents($file_path);
    } else {
        echo json_encode([]);
    }
    exit;
}

// 2. POST requests to save a new comment
if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    $slug = isset($data['slug']) ? basename($data['slug']) : '';
    $name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
    $email = isset($data['email']) ? strip_tags(trim($data['email'])) : '';
    $website = isset($data['website']) ? strip_tags(trim($data['website'])) : '';
    $text = isset($data['text']) ? strip_tags(trim($data['text'])) : '';
    
    if (!$slug || !$name || !$text) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields (slug, name, text)"]);
        exit;
    }
    
    $file_path = $comments_dir . '/' . $slug . '.json';
    
    $comments = [];
    if (file_exists($file_path)) {
        $comments = json_decode(file_get_contents($file_path), true);
        if (!is_array($comments)) {
            $comments = [];
        }
    }
    
    // Add new comment metadata
    $new_comment = [
        "name" => $name,
        "email" => $email,
        "website" => $website,
        "text" => $text,
        "date" => date('Y-m-d H:i:s'),
        "formatted_date" => date('F j, Y \a\t g:i a')
    ];
    
    $comments[] = $new_comment;
    
    file_put_contents($file_path, json_encode($comments, JSON_PRETTY_PRINT));
    
    echo json_encode($new_comment);
    exit;
}
?>
