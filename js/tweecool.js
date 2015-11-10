! function(t) {
    t.fn.extend({
        tweecool: function(e) {
            function a(t) {
                var e = new Date,
                    a = Date.parse(e),
                    r = 1e3 * t,
                    i = (a - r) / 1e3,
                    o = 1,
                    n = 60,
                    s = 3600,
                    _ = 86400,
                    l = 604800,
                    c = 2592e3,
                    u = 31536e3;
                return i > o && n > i ? Math.round(i / o) + " second" + (Math.round(i / o) > 1 ? "s" : "") + " ago" : i >= n && s > i ? Math.round(i / n) + " minute" + (Math.round(i / n) > 1 ? "s" : "") + " ago" : i >= s && _ > i ? Math.round(i / s) + " hour" + (Math.round(i / s) > 1 ? "s" : "") + " ago" : i >= _ && l > i ? Math.round(i / _) + " day" + (Math.round(i / _) > 1 ? "s" : "") + " ago" : i >= l && c > i ? Math.round(i / l) + " week" + (Math.round(i / l) > 1 ? "s" : "") + " ago" : i >= c && u > i ? Math.round(i / c) + " month" + (Math.round(i / c) > 1 ? "s" : "") + " ago" : "over a year ago"
            }
            var r = {
                    username: "tweecool",
                    limit: 5,
                    profile_image: !0,
                    show_time: !0,
                    show_media: !1,
                    show_media_size: "thumb",
                    show_actions: !1,
                    action_reply_icon: "&crarr;",
                    action_retweet_icon: "&prop;",
                    action_favorite_icon: "&#10084",
                    profile_img_url: "profile",
                    show_retweeted_text: !1
                },
                e = t.extend(r, e);
            return this.each(function() {
                var r, i, o, n, s, _ = e,
                    l = t(this),
                    c = t("<ul>").appendTo(l),
                    u = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
                    h = /@+(\w+)/gi,
                    w = /#+(\w+)/gi;
                t.getJSON("https://www.api.tweecool.com/?screenname=" + _.username + "&count=" + _.limit, function(e) {
                    return e.errors || null == e ? (l.html("Unable to sync :-("), !1) : void t.each(e.tweets, function(t, l) {
                        r = _.profile_image ? "tweet" == _.profile_img_url ? '<a href="https://twitter.com/' + _.username + "/status/" + l.id_str + '" target="_blank"><img src="' + e.user.profile_image_url + '" alt="' + _.username + '" /></a>' : '<a href="https://twitter.com/' + _.username + '" target="_blank"><img src="' + e.user.profile_image_url + '" alt="' + _.username + '" /></a>' : "", o = _.show_time ? a(l.timestamp) : "", i = _.show_media && l.media_url ? '<a href="https://twitter.com/' + _.username + "/status/" + l.id_str + '" target="_blank"><img src="' + l.media_url + ":" + _.show_media_size + '" alt="' + _.username + '" class="media" /></a>' : "", _.show_actions ? (n = '<div class="action-box"><ul>', n += '<li class="ab_reply"><a title="Reply" href="https://twitter.com/intent/tweet?in_reply_to=' + l.id_str + '">' + _.action_reply_icon + "</a></li>", n += '<li class="ab_retweet"><a title="Retweet" href="https://twitter.com/intent/retweet?tweet_id=' + l.id_str + '">' + _.action_retweet_icon + "</a>" + "</li>", n += '<li class="ab_favorite"><a title="Favorite" href="https://twitter.com/intent/favorite?tweet_id=' + l.id_str + '">' + _.action_favorite_icon + "</a>" + "</li>", n += "</ul></div>") : n = "", s = _.show_retweeted_text && l.retweeted_text ? l.retweeted_text : l.text, c.append("<li class=\"clearfix border-bottom\">" + r + '<div class="tweets_txt">' + s.replace(u, '<a href="$1" target="_blank">$1</a>').replace(h, '<a href="https://twitter.com/$1" target="_blank">@$1</a>').replace(w, '<a href="https://twitter.com/search?q=%23$1" target="_blank">#$1</a>') + i + " <span>" + o + "</span>" + n + "</div></li>")
                    })
                }).fail(function(t, e, a) {
                    l.html("Unable to sync :-(")
                })
            })
        }
    })
}(jQuery);
