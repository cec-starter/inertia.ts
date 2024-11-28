<?php

if (!function_exists('flashMessage')) {
    function flashMessage($title, $description): void
    {
        session()->flash('title', $title);
        session()->flash('description', $description);
    }
}
